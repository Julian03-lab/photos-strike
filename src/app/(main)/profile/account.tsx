import StyledInput from "@/components/inputs/StyledInput";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, {
  type Country,
  type CountryCode,
} from "react-native-country-picker-modal";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import LabelButton from "@/components/buttons/LabelButton";
import dayjs from "dayjs";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useSession } from "@/context/ctx";

const AccountScreen = () => {
  const { session } = useSession();
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<CountryCode>("AR");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [gender, setGender] = useState<string>("");
  const [name, setName] = useState<string>(session?.displayName || "");

  const onCountrySelect = (country: Country) => {
    setCountry(country.name as string);
    setCountryCode(country.cca2);
  };

  const onBirthdaySelect = (date: Date) => {
    setBirthday(date);
    setOpenDatePicker(false);
  };

  const onSubmit = () => {
    const data = {
      displayName: name,
      country,
      birthday,
      gender,
    };

    console.log(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputsContainer}>
        {/* Picture */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          {/* <Text style={styles.label}>Foto de perfil</Text> */}
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={{ uri: session?.photoURL }}
              style={{
                aspectRatio: 1,
                width: "50%",
                borderRadius: 1000,
                backgroundColor: "#CAE7CB",
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Email */}
        <StyledInput
          label="Correo registrado"
          value={session?.email as string}
          disabled
        />
        {/* Name */}
        <StyledInput
          label="Nombre completo"
          value={name}
          onChangeText={setName}
        />
        {/* Country */}
        <View>
          <Text style={styles.label}>Pais</Text>
          <CountryPicker
            {...{
              withFlag: true,
              withCountryNameButton: true,
              countryCode,
              onSelect: onCountrySelect,
              translation: "spa",
              containerButtonStyle: styles.flagButtonContainer,
            }}
          />
        </View>
        {/* Birthday */}
        <LabelButton
          label="Fecha de nacimiento"
          onPress={() => setOpenDatePicker(true)}
        >
          {birthday
            ? dayjs(birthday).format("DD/MM/YYYY")
            : "Fecha de nacimiento"}
        </LabelButton>
        <DateTimePicker
          isVisible={openDatePicker}
          mode="date"
          onConfirm={(newDate) => onBirthdaySelect(newDate)}
          onCancel={() => setOpenDatePicker(false)}
        />
        {/* Gender */}
        <View>
          <Text style={styles.label}>Genero</Text>
          <View
            style={{
              backgroundColor: "#CAE7CB",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              prompt="Genero"
            >
              <Picker.Item label="Hombre" value="man" />
              <Picker.Item label="Mujer" value="women" />
              <Picker.Item label="Otro" value="other" />
              <Picker.Item label="Prefiero no contestar" value="null" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Save button */}
      <PrimaryButton
        onPress={onSubmit}
        textStyles={{
          fontSize: 20,
          fontFamily: "Poppins_500Medium",
        }}
      >
        Guardar
      </PrimaryButton>
    </ScrollView>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 32,
  },
  inputsContainer: {
    gap: 16,
  },
  flagButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#0f0f0f",
    backgroundColor: "#CAE7CB",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CAE7CB",
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});
