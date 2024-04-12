import { Link } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../context/ctx";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

const LoginPage = () => {
  const { signIn, loading } = useSession();

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <>
          <Text style={styles.title}>Welcome Back!</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </SafeAreaView>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C090D",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  helper: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#5953FF",
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 28,
    borderRadius: 6,
  },
  arrow: {
    paddingHorizontal: 8,
  },
  google: {},
});
