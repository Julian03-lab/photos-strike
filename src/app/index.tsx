import { useSession } from "@/context/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

const index = () => {
  const { loading, session } = useSession();

  console.log(session);

  async function checkOnBoard() {
    const onBoard = await AsyncStorage.getItem("@viewedOnboarding");
    return router.replace(onBoard ? "/(auth)/" : "/(auth)/OnBoard");
  }

  useEffect(() => {
    if (loading) return;
    if (session) {
      router.push("/(main)/home");
    } else {
      checkOnBoard();
    }
  }, [loading, session]);
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};
export default index;
