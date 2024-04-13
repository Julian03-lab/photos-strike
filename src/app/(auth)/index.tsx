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
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { GoogleLogo } from "root/assets/svgs/Icons";

const LoginPage = () => {
  const { signIn, loading } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: "red",
          }}
        />
        <Text style={styles.title}>Visualize</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          volutpat scelerisque nisi, ac aliquam nibh pulvinar vel. Aenean id
          tortor quis turpis venenatis aliquam.
        </Text>
      </View>
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
              <GoogleLogo />
              <Text style={styles.buttonText}>Continuar con Google</Text>
            </View>
          </TouchableHighlight>
        </>
      ) : (
        <ActivityIndicator size="large" color="#51C878" />
      )}
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
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    borderColor: "#51C878",
    borderWidth: 1,
  },
  buttonText: {
    color: "rgba(0, 0, 0, 0.64)",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
