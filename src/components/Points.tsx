import { useSession } from "@/context/ctx";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AnimatedNumber from "react-native-animated-numbers";

const Points = () => {
  const { session } = useSession();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (session) {
      animationRef.current?.play();
    }
  }, [session]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginLeft: 20,
        // height: "100%",
      }}
    >
      {/* <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Puntos:
      </Text> */}
      <LottieView
        ref={animationRef}
        source={require("root/assets/animations/single-coin.json")}
        autoPlay={false}
        loop={false}
        style={{
          width: 40,
          height: 40,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <AnimatedNumber
          animateToNumber={session?.points || 0}
          fontStyle={{ fontSize: 22, fontWeight: "bold" }}
          containerStyle={{}}
          animationDuration={2500}
        />
        <Text>pts</Text>
      </View>
    </View>
  );
};
export default Points;
const styles = StyleSheet.create({});
