import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
const index = () => {
  useEffect(() => {
    setTimeout(() => {
      router.push("/(auth)");
    }, 1000);
  }, []);
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};
export default index;
