import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useSession } from "./context/ctx";

const index = () => {
  const { loading, session } = useSession();

  // console.log(loading, session);
  useEffect(() => {
    if (loading) return;
    if (session) {
      router.push("/home/");
    } else {
      router.push("/(auth)");
    }
  }, [loading, session]);
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};
export default index;
