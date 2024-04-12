import { useSession } from "@/context/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

const index = () => {
  const { loading, session } = useSession();

  // console.log(loading, session);
  useEffect(() => {
    if (loading) return;
    if (session) {
      router.push("/(auth)/OnBoard");
    } else {
      router.push("/(auth)/OnBoard");
    }
  }, [loading, session]);
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};
export default index;
