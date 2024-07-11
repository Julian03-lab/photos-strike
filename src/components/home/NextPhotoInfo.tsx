import { StyleSheet, Text, View } from "react-native";
import HomeTextSkeleton from "../skeletons/HomeTextSkeleton";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import useCalculateRemainingTime from "@/hooks/useCalculateRemainingTime";
import { Objective } from "@/utils/types";

type SelectorHeaderProps = {
  selectedObjective: Objective;
};

const NextPhotoInfo = ({ selectedObjective }: SelectorHeaderProps) => {
  const { loadingText, textToShow, canTakePhoto } =
    useCalculateRemainingTime(selectedObjective);

  return (
    <>
      {loadingText ? (
        <HomeTextSkeleton />
      ) : selectedObjective?.completed ? (
        <View>
          <Text style={styles.subtitle}>Objetivo completado</Text>
          <Link href={`/home/${selectedObjective.id}`} style={styles.link}>
            Ir al resultado
          </Link>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
            flex: 1,
            gap: 8,
          }}
        >
          {canTakePhoto ? (
            <LottieView
              source={require("root/assets/animations/camera-active.json")}
              autoPlay
              loop
              speed={0.5}
              style={{
                width: 50,
                height: "100%",
                //   backgroundColor: "red",
                transform: [{ scale: 6.5 }],
              }}
            />
          ) : (
            <LottieView
              source={require("root/assets/animations/time.json")}
              autoPlay
              loop
              speed={0.3}
              style={{
                width: 50,
                height: "100%",
                transform: [{ scale: 2.5 }],
                bottom: 4,
              }}
            />
          )}
          <Text style={styles.subtitle}>{textToShow}</Text>
        </View>
      )}
    </>
  );
};
export default NextPhotoInfo;
const styles = StyleSheet.create({
  subtitle: {
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
    flex: 1,
  },
  link: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "#51C878",
  },
});
