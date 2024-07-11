import { View, StyleSheet, Text, Button } from "react-native";
import EmptyHome from "@/screens/home/EmptyHome";
import ContentHome from "@/screens/home/ContentHome";
import useFetchObjectives from "@/hooks/useFetchObjectives";
import { useEffect, useState } from "react";
import {
  checkNotification,
  onDisplayNotification,
  onCancelNotification,
} from "@/utils/handleNotifications";
import { router, useLocalSearchParams } from "expo-router";
import { useSession } from "@/context/ctx";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import CompletedDayPopup from "@/components/popups/CompletedDayPopup";
import { useCalendars } from "expo-localization";

const HomePage = (): React.JSX.Element => {
  const { loading, objectives } = useFetchObjectives();
  const { session, loading: sessionLoading } = useSession();
  const { completed } = useLocalSearchParams();
  const userCalendar = useCalendars();

  // console.log(userCalendar);

  useEffect(() => {
    if (loading || sessionLoading) return;

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
  }, [loading || sessionLoading]);

  console.log(loading, sessionLoading, objectives.length);

  if (loading || sessionLoading) {
    return (
      <View style={styles.container}>
        <HomeSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CompletedDayPopup open={completed === "true"} />
      {/* <ContentHome objectives={objectives} /> */}
      {objectives.length > 0 ? <ContentHome /> : <EmptyHome />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
});

export default HomePage;
