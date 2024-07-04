import { useState } from "react";
import { View, StyleSheet } from "react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import StyledInput from "@/components/inputs/StyledInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LabelButton from "@/components/buttons/LabelButton";
import dayjs from "dayjs";
import { router, useGlobalSearchParams } from "expo-router";
// import formatDate from "@/utils/formatDate";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import Toast from "react-native-toast-message";
var customParseFormat = require("dayjs/plugin/customParseFormat");

const EditObjective = () => {
  const { objectiveId, title, endingDate, startingDate, notificationTime } =
    useGlobalSearchParams<{
      objectiveId: string;
      title: string;
      endingDate: string;
      startingDate: string;
      notificationTime: string;
    }>();

  const [objective, setObjective] = useState<string>(title as string);
  const [newEndingDate, setNewEndingDate] = useState(endingDate);
  const [newNotificationTime, setNewNotificationTime] =
    useState(notificationTime);
  const [showPicker, setShowPicker] = useState<"finishdate" | "time" | null>(
    null
  );
  const [updateObjective, isLoading] = useUpdateDoc();

  const handleUpdate = async () => {
    await updateObjective(objectiveId as string, {
      title: objective,
      endingDate: newEndingDate,
      notificationTime: newNotificationTime,
      totalDays: dayjs(newEndingDate, "DD/MM/YYYY").diff(
        dayjs(startingDate, "DD/MM/YYYY"),
        "days"
      ),
    });
    Toast.show({
      type: "success",
      text1: "Objetivo actualizado",
      text2: "Tu objetivo ha sido actualizado correctamente",
    });
    router.push("/(main)/objectives");
  };
  dayjs.extend(customParseFormat);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputsContainer}>
        <StyledInput
          label="Titulo del objetivo"
          placeholder="Cambio fisico"
          onChangeText={setObjective}
          value={objective}
        />
        <LabelButton
          disabled
          label="Fecha de inicio"
          onPress={() => setShowPicker(null)}
        >
          {startingDate}
        </LabelButton>
        <LabelButton
          label="Fecha de finalizacion"
          onPress={() => setShowPicker("finishdate")}
        >
          {newEndingDate}
        </LabelButton>
        <DateTimePickerModal
          date={dayjs(endingDate, "DD-MM-YYYY").toDate()}
          display="default"
          isVisible={showPicker === "finishdate"}
          mode="date"
          onConfirm={(date) => {
            setShowPicker(null);
            setNewEndingDate(dayjs(date).format("DD/MM/YYYY"));
          }}
          onCancel={() => setShowPicker(null)}
          minimumDate={dayjs(endingDate, "DD-MM-YYYY").toDate()}
        />
      </View>
      <PrimaryButton onPress={handleUpdate} loading={isLoading}>
        Actualizar objetivo
      </PrimaryButton>
    </KeyboardAwareScrollView>
  );
};
export default EditObjective;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexGrow: 1,
    backgroundColor: "#fff",
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins_500Medium",
  },
  inputsContainer: {
    flex: 1,
    gap: 20,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});
