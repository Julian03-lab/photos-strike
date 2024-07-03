import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ConfirmClosePopup from "@/components/popups/ConfirmClosePopUp";
import { useState } from "react";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { router } from "expo-router";
import useUpdateUser from "@/hooks/useUpdateUser";
import { useSession } from "@/context/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TimeModal() {
  const [handleUpdate, loading] = useUpdateUser();
  const { session, setSession } = useSession();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [notificationTime, setNotificationTime] = useState(
    dayjs().format("HH:mm")
  );
  const [showTimePicker, setShowTimePicker] = useState(false);

  const updateSession = async (newData: any) => {
    if (session) {
      setSession(newData);
      await AsyncStorage.setItem("@user", JSON.stringify(newData));
    }
  };

  const handleClose = async () => {
    router.push("/(main)/home");
    await updateSession({ ...session, notificationTime: null });
  };

  const handleChange = async () => {
    handleUpdate({ notificationTime });

    await updateSession({ ...session, notificationTime });

    router.push("/(main)/home");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
      }}
    >
      <ConfirmClosePopup
        open={confirmationOpen}
        handleOpen={setConfirmationOpen}
        callback={handleClose}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          zIndex: 1000,
        }}
        activeOpacity={0.6}
        onPress={() => setConfirmationOpen(true)}
      >
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>

      <DateTimePickerModal
        date={dayjs(notificationTime, "HH:mm").toDate()}
        display="spinner"
        isVisible={showTimePicker}
        mode="time"
        onConfirm={(date) => {
          setNotificationTime(dayjs(date).format("HH:mm"));
          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Horario de notifiacion</Text>
        <Text style={styles.subtitle}>
          Selecciona el horario en el que deseas recibir un recordatorio cada
          dia
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={{
          flexDirection: "row",
          gap: 20,
          paddingHorizontal: 16,
          paddingTop: 10,
          alignContent: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 20,
          width: "100%",
        }}
      >
        <Text style={styles.timeText}>{notificationTime}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleChange}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={27} />
          ) : (
            <Text style={styles.buttonText}>Establecer horario</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setConfirmationOpen(true)}
        >
          <Text style={styles.skip}>Omitir</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#000000",
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 12,
    flex: 0,
  },
  button: {
    backgroundColor: "#51C878",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  skip: {
    color: "#51C878",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  timeText: {
    fontSize: 64,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
  },
});
