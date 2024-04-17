import MiniPhotoCard from "@/components/cards/MiniPhotoCard";
import { useSession } from "@/context/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const index = () => {
  const { loading, session } = useSession();

  async function checkOnBoard() {
    const onBoard = await AsyncStorage.getItem("@viewedOnboarding");
    return router.replace(onBoard ? "/(auth)/" : "/(auth)/OnBoard");
  }

  // useEffect(() => {
  //   if (loading) return;
  //   if (session) {
  //     router.push("/(main)/home");
  //   } else {
  //     checkOnBoard();
  //   }
  // }, [loading, session]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        gap: 40,
      }}
    >
      <MiniPhotoCard index={1} />
      <MiniPhotoCard index={1} unlocked />
      {/* <ActivityIndicator size="large" color="#51C878" /> */}
    </View>
  );
};
export default index;
