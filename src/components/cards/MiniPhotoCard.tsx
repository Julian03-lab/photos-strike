import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CardProps = {
  index: number;
  unlocked?: boolean;
  imageUrl?: string;
  objectiveId: string;
  empty?: boolean;
};

const MiniPhotoCard = ({
  index,
  unlocked = false,
  imageUrl,
  objectiveId,
  empty,
}: CardProps) => {
  const lockedRef: any = useRef(null);
  const unlockedRef: any = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // console.log(permission);

  const handlePress = async () => {
    if (imageUrl) return;
    if (unlocked) {
      // if (permission?.canAskAgain === false && permission?.status !== "granted") {
      //   return Linking.openSettings();
      // }

      if (permission?.status === "granted") {
        router.push({ pathname: "/home/take-photo", params: { objectiveId } });
      } else {
        const result = await requestPermission();
        if (result.status === "granted") {
          router.push({
            pathname: "/home/take-photo",
            params: { objectiveId },
          });
        }
      }
    } else {
      lockedRef.current.play();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handlePress}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        // gap: 4,
        borderWidth: 1.5,
        borderColor: !unlocked ? "rgba(0,0,0,1)" : "#51C878",
        overflow: "hidden",
        position: "relative",
        zIndex: 0,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: imageUrl ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.8)",
        }}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          blurRadius={35}
          resizeMode="cover"
        />
      )}
      <Text
        style={{
          position: "relative",
          top: 8,
          zIndex: 1,
          fontSize: 16,
          fontFamily: "Poppins_600SemiBold",
          color: imageUrl ? "#fff" : "#fff",
        }}
      >
        Dia {index + 1}
      </Text>
      {!imageUrl ? (
        empty === true ? (
          <Feather name="eye" size={24} />
        ) : !unlocked ? (
          //   <Feather name="lock" size={24} />
          <LottieView
            autoPlay
            loop={false}
            ref={lockedRef}
            style={{
              width: 56,
              height: 56,
            }}
            source={require("root/assets/animations/locked.json")}
          />
        ) : (
          <LottieView
            autoPlay
            duration={5000}
            ref={unlockedRef}
            style={{
              width: 56,
              height: 56,
            }}
            source={require("root/assets/animations/unlocked.json")}
          />
          //   <Feather name="unlock" size={24} color={"#51C878"} />
        )
      ) : null}
    </TouchableOpacity>
  );
};

export default MiniPhotoCard;
