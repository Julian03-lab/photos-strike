import { useState } from "react";
import { View, StyleSheet } from "react-native";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import StyledInput from "@/components/inputs/StyledInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LabelButton from "@/components/buttons/LabelButton";
import dayjs from "dayjs";
import useAddObjective from "@/hooks/useAddObjective";
import { router } from "expo-router";
var customParseFormat = require("dayjs/plugin/customParseFormat");

const NewObjective = () => {
  const [objective, setObjective] = useState<string>("");
  const [startingDate, setStartingDate] = useState(
    dayjs().format("DD/MM/YYYY")
  );
  const [endingDate, setEndingDate] = useState(
    dayjs().add(1, "week").format("DD/MM/YYYY")
  );
  const [notificationTime, setNotificationTime] = useState(
    dayjs().format("HH:mm")
  );
  const [showPicker, setShowPicker] = useState<
    "startdate" | "finishdate" | "time" | null
  >(null);
  const { addObjective, loading } = useAddObjective(
    {
      objective,
      startingDate,
      endingDate,
      notificationTime,
    },
    redirectToIndex
  );

  function redirectToIndex() {
    router.push("/(main)/objectives");
  }
  // const [frecuency, setFrecuency] = useState<number>(1);
  // const [customFrecuency, setCustomFrecuency] = useState<number | null>(null);

  // const selectors = [
  //   {
  //     value: 1,
  //     label: "Diario",
  //   },
  //   {
  //     value: 7,
  //     label: "Semanal",
  //   },
  //   {
  //     value: 0,
  //     label: customFrecuency ? `${customFrecuency} dias` : "Custom",
  //   },
  // ];
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
          label="Fecha de inicio"
          onPress={() => setShowPicker("startdate")}
        >
          {startingDate}
        </LabelButton>
        <LabelButton
          label="Fecha de finalizacion"
          onPress={() => setShowPicker("finishdate")}
        >
          {endingDate}
        </LabelButton>
        <LabelButton
          label="Hora del recordatorio"
          onPress={() => setShowPicker("time")}
        >
          {notificationTime}
        </LabelButton>

        <DateTimePickerModal
          date={new Date()}
          display="default"
          isVisible={showPicker === "startdate"}
          mode="date"
          onConfirm={(date) => {
            setShowPicker(null);
            setStartingDate(dayjs(date).format("DD/MM/YYYY"));
            setEndingDate(dayjs(date).add(1, "week").format("DD/MM/YYYY"));
          }}
          onCancel={() => setShowPicker(null)}
          minimumDate={new Date()}
        />
        <DateTimePickerModal
          date={dayjs(endingDate, "DD-MM-YYYY").toDate()}
          display="default"
          isVisible={showPicker === "finishdate"}
          mode="date"
          onConfirm={(date) => {
            setShowPicker(null);
            setEndingDate(dayjs(date).format("DD/MM/YYYY"));
          }}
          onCancel={() => setShowPicker(null)}
          minimumDate={dayjs(startingDate, "DD-MM-YYYY")
            .add(1, "week")
            .toDate()}
        />
        <DateTimePickerModal
          date={new Date()}
          display="spinner"
          isVisible={showPicker === "time"}
          mode="time"
          onConfirm={(date) => {
            setNotificationTime(dayjs(date).format("HH:mm"));
            setShowPicker(null);
          }}
          onCancel={() => setShowPicker(null)}
        />
        {/* <View>
          <Text style={styles.label}>Frecuencia del objetivo</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            {selectors.map((selector) => (
              <Chip
                key={selector.value}
                value={selector.value}
                label={selector.label}
                selectedChip={frecuency}
                setSelectedChip={setFrecuency}
              />
            ))}
          </View>
        </View>
        {frecuency === 0 && (
          <View>
            <StyledInput
              value={customFrecuency ? customFrecuency.toString() : ""}
              keyboardType="number-pad"
              placeholder="Cantidad de dias"
              onChangeText={(text) => setCustomFrecuency(Number(text))}
            />
          </View>
        )}*/}
      </View>
      <PrimaryButton onPress={addObjective} loading={loading}>
        Crear objetivo
      </PrimaryButton>
    </KeyboardAwareScrollView>
  );
};
export default NewObjective;

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
