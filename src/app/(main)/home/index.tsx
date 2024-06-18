import { View, StyleSheet, ActivityIndicator, Button } from "react-native";
import EmptyHome from "@/screens/home/EmptyHome";
import ContentHome from "@/screens/home/ContentHome";
import useFetchObjectives from "@/hooks/useFetchObjectives";
import { useEffect } from "react";
import {
  checkNotification,
  onDisplayNotification,
  onCancelNotification,
} from "@/utils/handleNotifications";
import { router } from "expo-router";
import { useSession } from "@/context/ctx";

const HomePage = (): React.JSX.Element => {
  const { loading, objectives } = useFetchObjectives();
  const { session } = useSession();

  useEffect(() => {
    if (loading) return;

    if (session?.notificationTime === undefined) {
      router.push("/modal/");
      return;
    }

    if (session?.notificationTime !== null) {
      // console.log(session?.notificationTime);
      const [hour, minutes] = session?.notificationTime.split(":").map(Number);
      checkNotification().then((res) => {
        if (!res) {
          console.log("Seteando notificacion, ", hour, minutes);
          onDisplayNotification(hour, minutes);
        }
      });
    } else {
      onCancelNotification();
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Button onPress={onCancelNotification} title="Cancel Notification" /> */}
      {objectives.length > 0 ? (
        <ContentHome objectives={objectives} />
      ) : (
        <EmptyHome />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomePage;
