import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, {
  AndroidImportance,
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import dayjs from "dayjs";

const formatTime = (hours: number, minutes: number) => {
  const hour = hours < 10 ? `0${hours}` : hours;
  const minute = minutes < 10 ? `0${minutes}` : minutes;
  return `${hour}:${minute}`;
};

export const checkNotification = async (time: string) => {
  const notificationStatus = await AsyncStorage.getItem("@notificationTime");

  // For debugging purposes
  notifee
    .getTriggerNotificationIds()
    .then((ids) => console.log("All trigger notifications: ", ids));
  console.log(
    "📁Archivo: handleNotifications.ts | Linea: 10 | notificationStatus -> ",
    notificationStatus
  );

  if (!notificationStatus) {
    return false;
  }

  return notificationStatus === time;
};

export async function onDisplayNotification(hour: number, minutes: number) {
  console.log(
    "📁Archivo: handleNotifications.ts | Linea: 28 | Seteando notifiacion"
  );
  try {
    await onCancelNotification();
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
      date = date.add(1, "day");
    }

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.toDate().getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
      // alarmManager: {
      //   allowWhileIdle: true,
      // },
    };

    // Display a notification
    await notifee.createTriggerNotification(
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
    await AsyncStorage.setItem("@notificationTime", formatTime(hour, minutes));
    console.log(
      "📁Archivo: handleNotifications.ts | Linea: 79 Notificacion Seteada"
    );
  } catch (error) {
    console.log(error);
  }
}

export async function onCancelNotification() {
  try {
    // Cancel the notification
    await notifee.cancelAllNotifications();

    // Remove the notification id from the device storage
    await AsyncStorage.removeItem("@notificationTime");
  } catch (error) {
    console.log(error);
  }
}
