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
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";

const HomePage = (): React.JSX.Element => {
  const { loading, objectives } = useFetchObjectives();
  const { session } = useSession();

  useEffect(() => {
    if (loading) return;

    console.log('📁Archivo: home/index.tsx | Linea: 22 | notification -> ', session);

     if (session?.notificationTime === undefined) {
       router.push("/home/modal");
       return;
     }

     if (session?.notificationTime !== null) {
       const [hour, minutes] = session?.notificationTime.split(":").map(Number);
       checkNotification(session?.notificationTime).then((exist) => {
         if (!exist) {
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
        <HomeSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
