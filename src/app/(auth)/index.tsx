import AuthInput from "@/components/inputs/AuthInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Enter your email address and password to get access your account
      </Text>
      <AuthInput />
      <AuthInput />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={styles.helper}>Forgot?</Text>
        <TouchableHighlight onPress={() => console.log("lgin")}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#3B35E0",
              alignItems: "center",
              borderRadius: 6,
            }}
          >
            <Text style={styles.button}>Login</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color="white"
              style={styles.arrow}
            />
          </View>
        </TouchableHighlight>
      </View>
      <Button title="Login with google" onPress={() => {}} />
      <View>
        <Text style={styles.subtitle}>Don't have an account?</Text>
        <Link style={styles.helper} href={"/(auth)/register"}>
          Register
        </Link>
      </View>
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
