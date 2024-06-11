import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TurnNotificationsScreen = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <LottieView
        autoPlay
        style={{
          width: "100%",
          // height: 300,
          aspectRatio: 1,
        }}
        source={require("root/assets/animations/notifications.json")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Turn on notifications?</Text>
        <Text style={styles.subtitle}>
          Dont miss important messages like check-in details and account
          activity.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Enable Notifications</Text>
        </TouchableOpacity>
        <Link href={"/(auth)"} style={styles.skip} asChild>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
export default TurnNotificationsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "#000000",
    textAlign: "center",
  },
  textContainer: {
    paddingHorizontal: 44,
    alignItems: "center",
    gap: 12,
    flex: 0,
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
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  skip: {
    color: "#51C878",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
