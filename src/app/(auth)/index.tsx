import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../context/ctx";
import { GoogleLogo } from "root/assets/svgs/Icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginPage = () => {
  const { signIn, loading } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>Encantado de tenerte en</Text>
        <Text style={styles.title}>Visualize</Text>
        <Text style={styles.subtitle}>Preparate para ver tus avances</Text>
        <View
          style={{
            marginTop: 20,
            width: 200,
            height: 200,
            backgroundColor: "red",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#51C878",
          }}
        />
        {!loading ? (
          <>
            <TouchableHighlight
              underlayColor={"#51C878"}
              style={styles.button}
              onPress={signIn}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <MaterialCommunityIcons name="google" size={24} color="white" />
                <Text style={styles.buttonText}>Continuar con Google</Text>
              </View>
            </TouchableHighlight>
          </>
        ) : (
          <ActivityIndicator size="large" color="#51C878" />
        )}
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
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
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
});
