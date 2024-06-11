import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
  Linking,
  ActivityIndicator,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const response = await Notifications.getPermissionsAsync();
    const existingStatus = response.status;
    let finalStatus = existingStatus;

    console.log(response);

    if (!response.canAskAgain) {
      Linking.openSettings();
      return;
    }

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

function TurnNotificationsScreen() {
  const [loading, setLoading] = useState(false);
  // const [expoPushToken, setExpoPushToken] = useState("");
  // const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
  //   []
  // );
  // const [notification, setNotification] = useState<
  //   Notifications.Notification | undefined
  // >(undefined);
  // const notificationListener = useRef<Notifications.Subscription>();
  // const responseListener = useRef<Notifications.Subscription>();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(
  //     (token) => token && setExpoPushToken(token)
  //   );

  //   if (Platform.OS === "android") {
  //     Notifications.getNotificationChannelsAsync().then((value) =>
  //       setChannels(value ?? [])
  //     );
  //   }
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     notificationListener.current &&
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //     responseListener.current &&
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  const handlePress = async () => {
    setLoading(true);
    await registerForPushNotificationsAsync();
    setLoading(false);
    router.push("/(auth)");
  };

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
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handlePress}
        >
          {loading ? (
            <ActivityIndicator size={27} color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enable Notifications</Text>
          )}
        </TouchableOpacity>
        <Link href={"/(auth)"} style={styles.skip} asChild>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

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
