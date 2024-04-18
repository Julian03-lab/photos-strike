import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  FlashMode,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useSubmitPhoto from "@/hooks/useSubmitPhoto";
import LottieView from "lottie-react-native";

const CAMERA_ICON_SIZE = 64;
const OTHER_ICON_SIZE = 28;

const PhotoPreview = ({
  image,
  onClose,
  objectiveId,
}: {
  image: CameraCapturedPicture;
  onClose: () => void;
  objectiveId: string;
}) => {
  const { saveImage, loading } = useSubmitPhoto();
  const [submited, setSubmited] = useState(false);

  const handleSend = async () => {
    await saveImage(image, objectiveId, () => setSubmited(true));
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        onClose();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {submited ? (
        <LottieView
          source={require("root/assets/animations/uploaded.json")}
          style={{ width: "100%", height: "100%", zIndex: 2 }}
          onAnimationFinish={() => router.replace("/home/")}
          loop={false}
          autoPlay
          speed={1.5}
        />
      ) : (
        <ActivityIndicator
          size={64}
          color="white"
          style={{ zIndex: 2 }}
          animating={loading}
        />
      )}
      <ImageBackground
        source={{ uri: image.uri }}
        style={styles.camera}
        resizeMode="cover"
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="close"
              size={OTHER_ICON_SIZE}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSend} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="send-check"
              size={OTHER_ICON_SIZE}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const CameraComponent = ({ objectiveId }: { objectiveId: string }) => {
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<Camera>(null);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlash() {
    setFlash((current) => !current);
  }

  async function takePicture() {
    if (cameraRef.current && cameraReady) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });
      const source = photo.base64;
      if (source) {
        await cameraRef.current.pausePreview();
        setImage(photo);
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
      selectionLimit: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0] as CameraCapturedPicture);
    }
  };

  function goBack() {
    router.back();
  }

  function onClose() {
    setImage(null);
  }

  return (
    <View style={[styles.container, { marginTop: StatusBar.currentHeight }]}>
      {image ? (
        <PhotoPreview
          image={image}
          onClose={onClose}
          objectiveId={objectiveId}
        />
      ) : (
        <>
          <Camera
            style={styles.camera}
            type={type}
            ratio="16:9"
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
            flashMode={flash ? FlashMode.torch : FlashMode.off}
          />
          <View style={styles.topBar}>
            <TouchableOpacity onPress={goBack} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={OTHER_ICON_SIZE}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFlash} activeOpacity={0.8}>
              {flash ? (
                <MaterialCommunityIcons
                  name="flashlight-off"
                  size={OTHER_ICON_SIZE}
                  color="white"
                />
              ) : (
                <MaterialCommunityIcons
                  name="flashlight"
                  size={OTHER_ICON_SIZE}
                  color="white"
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="view-gallery"
                size={OTHER_ICON_SIZE}
                color="grey"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="record-circle-outline"
                size={CAMERA_ICON_SIZE}
                color="red"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="camera-flip"
                size={OTHER_ICON_SIZE}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusBar backgroundColor="black" />
    </View>
  );
};
export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  camera: {
    // aspectRatio: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    padding: 10,
  },
  photoButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: "rgb(0,0,0)",
    zIndex: 3,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
