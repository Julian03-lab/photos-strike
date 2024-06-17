import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import dayjs from "dayjs";

export const checkNotification = async () => {
  const notificationStatus = await AsyncStorage.getItem("@notificationId");

  // For debugging purposes
  // notifee
  //   .getTriggerNotificationIds()
  //   .then((ids) => console.log("All trigger notifications: ", ids));
  // console.log(
  //   "📁Archivo: handleNotifications.ts | Linea: 10 | notificationStatus -> ",
  //   notificationStatus
  // );

  return !!notificationStatus;
};

export async function onDisplayNotification(hour: number, minutes: number) {
  try {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Daily reminder",
      vibration: true,
      vibrationPattern: [500, 500],
      sound: "default",
      importance: AndroidImportance.HIGH,
    });

    let date = dayjs()
      .set("hour", hour)
      .set("minute", minutes)
      .set("second", 0);

    if (date.isBefore(dayjs())) {
      console.log("Agregando un dia");
      date = date.add(1, "day");
    }

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.toDate().getTime(),
      repeatFrequency: RepeatFrequency.HOURLY,
      // alarmManager: {
      //   allowWhileIdle: true,
      // },
    };

    // Display a notification
    const notificationId = await notifee.createTriggerNotification(
      {
        title: "No olvides tomar la foto de hoy!",
        body: "Toma la foto de tu progreso diario para seguir avanzando en tu objetivo",
        android: {
          channelId: channelId,
          pressAction: {
            id: "default",
          },
        },
      },
      trigger
    );

    // Save the notification id to the device storage
    await AsyncStorage.setItem("@notificationId", notificationId);
  } catch (error) {
    console.log(error);
  }
}

export async function onCancelNotification() {
  // Retrieve the notification id from the device storage
  try {
    console.log("Cancelando notificacion");
    const notificationId = await AsyncStorage.getItem("@notificationId");

    if (!notificationId) {
      return;
    }

    // Cancel the notification
    await notifee.cancelNotification(notificationId);

    // Remove the notification id from the device storage
    await AsyncStorage.removeItem("@notificationId");
  } catch (error) {
    console.log(error);
  }
}
