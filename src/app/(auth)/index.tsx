import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../context/ctx";
import { GoogleLogo } from "root/assets/svgs/Icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const LoginPage = () => {
  const { signIn, loading } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View style={styles.main}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("root/assets/images/visualize-icon.png")}
            style={{ width: 80, height: 80 }}
          />
          <Text style={styles.title}>Visualize</Text>
        </View>
        <Text style={styles.subtitle}>PRESENCIA TUS OBJETIVOS</Text>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <PrimaryButton
          loading={loading}
          fullWidth
          icon={
            <MaterialCommunityIcons name="google" size={24} color="white" />
          }
          iconPosition="left"
          onPress={signIn}
          textStyles={styles.buttonText}
        >
          Continuar con Google
        </PrimaryButton>
        <Text style={styles.helper}>
          Al continuar, aceptas los términos de uso y la política de privacidad
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    color: "#51C878",
    fontSize: 60,
    fontFamily: "Poppins_400Regular",
    lineHeight: 80,
  },
  subtitle: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  helper: {
    color: "rgba(0,0,0,0.5)",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});
