import StyledInput from "@/components/inputs/StyledInput";
import { useState } from "react";
import {
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
import useUpdateUser from "@/hooks/useUpdateUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { type CameraCapturedPicture } from "expo-camera";
import { Feather } from "@expo/vector-icons";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const AccountScreen = () => {
  const { session, setSession } = useSession();
  const [handleUpdate, loading] = useUpdateUser();
  const [country, setCountry] = useState<string>("Argentina");
  const [countryCode, setCountryCode] = useState<CountryCode>("AR");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(
    dayjs(session?.birthday, "DD/MM/YYYY").toDate() || null
  );
  const [gender, setGender] = useState<string>("man");
  const [name, setName] = useState<string>(session?.displayName || "");
  const [image, setImage] = useState<CameraCapturedPicture | null>(
    session ? ({ uri: session?.photoURL } as CameraCapturedPicture) : null
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
      selectionLimit: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0] as CameraCapturedPicture);
    }
  };

  const saveImage = async (image: CameraCapturedPicture) => {
    try {
      let base64Img = `data:image/jpg;base64,${image.base64}`;
      let apiUrl = "https:api.cloudinary.com/v1_1/dadt6ioi4/image/upload";
      let data = {
        file: base64Img,
        upload_preset: "azigrdxg",
      };

      const response = await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const file = await response.json();

      return file.secure_url;
    } catch (error) {
      console.log("Save image error: ", error);
    }
  };

  const onCountrySelect = (country: Country) => {
    setCountry(country.name as string);
    setCountryCode(country.cca2);
  };

  const onBirthdaySelect = (date: Date) => {
    setBirthday(date);
    setOpenDatePicker(false);
  };

  const onSubmit = async () => {
    if (!session) return;

    let photoURL = null;

    if (image && image.base64) {
      photoURL = await saveImage(image);
    }

    const data: { [key: string]: string | Date | null } = {
      displayName: name,
      country,
      birthday: dayjs(birthday).isSame(dayjs(session?.birthday, "DD/MM/YYYY"))
        ? null
        : dayjs(birthday).format("DD/MM/YYYY"),
      gender,
      photoURL,
    };

    if (country === session.country) delete data.country;
    if (gender === session.gender) delete data.gender;
    if (name === session.displayName) delete data.displayName;

    Array.from(Object.entries(data)).forEach(([key, value]) => {
      if (!value) {
        delete data[key];
      }
    });

    if (data) {
      await handleUpdate(data);
      setSession({ ...session, ...data });
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({ ...session, ...data })
      );
    }
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
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                src={image.uri}
                style={{
                  aspectRatio: 1,
                  width: "50%",
                  borderRadius: 1000,
                  backgroundColor: "#CAE7CB",
                }}
              />
            ) : (
              <View
                style={{
                  aspectRatio: 1,
                  width: "50%",
                  borderRadius: 1000,
                  backgroundColor: "#CAE7CB",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="upload" size={64} color="#0f0f0f" />
              </View>
            )}
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
        loading={loading}
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
