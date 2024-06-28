import FlatButton from "@/components/buttons/FlatButton";
import WarningPopUp from "@/components/popups/WarningPopUp";
import { useSession } from "@/context/ctx";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { signOut, session } = useSession();
  const [openModal, setOpenModal] = useState(false);

  if (!session) return null;

  const { displayName, photoURL } = session;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Profile picture */}
        <Image style={styles.profilePicture} source={{ uri: photoURL }} />

        <View style={styles.informationContainer}>
          {/* Name */}
          <Text style={styles.nameText}>{displayName}</Text>

          {/* Information */}
          <View style={styles.extraInfo}>
            <Text style={styles.countryText}>🇦🇷Argentina</Text>
            <Text style={styles.ageText}>21 años</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <FlatButton
          onPress={() => null}
          leftIcon={
            <Feather name="bar-chart-2" size={24} color="rgba(32,52,79,0.7)" />
          }
          rightIcon={
            <Feather
              name="chevron-right"
              size={24}
              color="rgba(32,52,79,0.7)"
            />
          }
        >
          Estadisticas
        </FlatButton>
        <FlatButton
          onPress={() => null}
          leftIcon={
            <Feather name="user" size={24} color="rgba(32,52,79,0.7)" />
          }
          rightIcon={
            <Feather
              name="chevron-right"
              size={24}
              color="rgba(32,52,79,0.7)"
            />
          }
        >
          Cuenta
        </FlatButton>
        <FlatButton
          onPress={() => router.push("/profile/notifications")}
          leftIcon={
            <Feather name="bell" size={24} color="rgba(32,52,79,0.7)" />
          }
          rightIcon={
            <Feather
              name="chevron-right"
              size={24}
              color="rgba(32,52,79,0.7)"
            />
          }
        >
          Notificaciones
        </FlatButton>
        <FlatButton
          onPress={() => setOpenModal(true)}
          leftIcon={
            <Feather name="log-out" size={24} color="rgba(32,52,79,0.7)" />
          }
        >
          Cerrar sesion
        </FlatButton>
      </View>
      <WarningPopUp
        open={openModal}
        handleOpen={setOpenModal}
        callback={signOut}
        title="Estas seguro de cerrar sesion?"
        buttonTitle="Cerrar sesion"
      />
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#CAE7CB",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  profilePicture: {
    aspectRatio: 1,
    width: 84,
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
  },
  nameText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 28,
    color: "#1F1F1F",
    width: "100%",
    textTransform: "capitalize",
  },
  informationContainer: {
    flex: 1,
    justifyContent: "center",
  },
  extraInfo: {
    flexDirection: "row",
    gap: 24,
  },
  countryText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#1F1F1F",
  },
  ageText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#1F1F1F",
  },
  buttonsContainer: {
    gap: 24,
    paddingHorizontal: 16,
  },
});
