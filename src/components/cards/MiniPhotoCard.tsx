import { Feather } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import BigPhotoCard from "./BigPhotoCard";
import { IFile } from "@/utils/types";

type CardProps = {
  index: number;
  imageUrl?: string;
  objectiveId: string | undefined;
  file: IFile;
};

const MiniPhotoCard = ({
  index,
  imageUrl,
  objectiveId,
  file: { empty, unlocked, bigView, id },
}: CardProps) => {
  const lockedRef = useRef<LottieView>(null);
  const unlockedRef = useRef<LottieView>(null);
  const skipedRef = useRef<LottieView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [openPhoto, setOpenPhoto] = useState(false);
  // console.log(permission);

  if (!objectiveId) return null;

  const handlePress = async () => {
    if (empty) {
      skipedRef.current?.play();
      return;
    }
    if (imageUrl) {
      setOpenPhoto(!openPhoto);
      return;
    }
    if (unlocked) {
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
      lockedRef.current?.play();
    }
  };

  return (
    <>
      <BigPhotoCard
        src={imageUrl}
        photoOpened={openPhoto}
        closePhoto={() => setOpenPhoto(false)}
        available={bigView || false}
        fileId={id as string}
        objectiveId={objectiveId}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handlePress}
        style={{
          flex: 1,
          aspectRatio: 1,
          maxWidth: 150,
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
            width: "100%",
            aspectRatio: 1,
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
              width: "100%",
              aspectRatio: 1,
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
            <LottieView
              autoPlay={true}
              loop={false}
              ref={skipedRef}
              style={{
                width: 36,
                height: 36,
                marginTop: 8,
              }}
              source={require("root/assets/animations/cancel.json")}
            />
          ) : !unlocked ? (
            //   <Feather name="lock" size={24} />
            <LottieView
              autoPlay={false}
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
    </>
  );
};

export default MiniPhotoCard;
