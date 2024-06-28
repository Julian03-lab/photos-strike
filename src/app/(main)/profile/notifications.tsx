import CustomSwitch from "@/components/buttons/CustomSwitch";
import FlatButton from "@/components/buttons/FlatButton";
import { useSession } from "@/context/ctx";
import useUpdateUser from "@/hooks/useUpdateUser";
import {
  checkNotification,
  onCancelNotification,
  onDisplayNotification,
} from "@/utils/handleNotifications";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const NotificationScreen = () => {
  const { session, setSession } = useSession();
  const [isEnabled, setIsEnabled] = useState(
    session?.notificationTime ? true : false
  );
  const [notificationTime, setNotificationTime] = useState(
    session?.notificationTime || null
  );
  const [handleUpdateUser] = useUpdateUser();
  const [showTimePicker, setShowTimePicker] = useState(false);

  if (!session) return null;

  const handleDeleteNotification = async () => {
    setIsEnabled(false);
    setNotificationTime(null);
    await onCancelNotification();
    setSession({ ...session, notificationTime: null });
    await handleUpdateUser({ notificationTime: null });

    console.log("Notificacion eliminada");
  };

  const handleUpdateNotification = async (date: Date) => {
    const time = dayjs(date).format("HH:mm");
    const [hours, minutes] = time.split(":").map(Number);

    setNotificationTime(time);
    setShowTimePicker(false);
    setSession({ ...session, notificationTime: time });
    await handleUpdateUser({ notificationTime: time });
    await onDisplayNotification(hours, minutes);
  };

  const handleChangeValue = async (value: boolean) => {
    if (value) {
      setIsEnabled(true);
      setShowTimePicker(true);
    } else {
      await handleDeleteNotification();
    }
  };

  return (
    <View style={styles.container}>
      <CustomSwitch
        value={isEnabled}
        handlePress={() => handleChangeValue(!isEnabled)}
      >
        Activar notificaciones
      </CustomSwitch>
      <FlatButton
        onPress={() => null}
        customStyles={{ opacity: isEnabled ? 1 : 0.4 }}
        disabled={!isEnabled}
      >
        Horario de notificacion: {notificationTime}
      </FlatButton>
      {/* <FlatButton
        onPress={() => checkNotification(session.notificationTime as string)}
      >
        Checkear notificaciones
      </FlatButton> */}
      <DateTimePickerModal
        date={
          notificationTime
            ? dayjs(notificationTime, "HH:mm").toDate()
            : dayjs().toDate()
        }
        display="spinner"
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleUpdateNotification}
        onCancel={() => {
          setShowTimePicker(false);
          setIsEnabled(false);
        }}
      />
    </View>
  );
};
export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
});
