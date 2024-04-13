import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NotificationSvg } from "root/assets/svgs/notificationSvg";
const TurnNotificationsScreen = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <NotificationSvg />
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
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
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
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  skip: {
    color: "#51C878",
    fontSize: 16,
    fontWeight: "600",
  },
});
