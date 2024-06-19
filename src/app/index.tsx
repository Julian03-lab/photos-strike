import { useSession } from "@/context/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";

const index = () => {
  const { loading, session } = useSession();

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
    <ImageBackground
      source={require("root/assets/images/splash.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator
        size="large"
        color="#51c878"
        style={{
          marginTop: 400,
        }}
      />
    </ImageBackground>
  );
};
export default index;
