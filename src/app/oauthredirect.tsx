import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";
const Oauthredirect = () => {
  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <View>
      <Text>Oauthredirect</Text>
    </View>
  );
};
export default Oauthredirect;
