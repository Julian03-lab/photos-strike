import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  CameraView,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Text,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import useSubmitPhoto from "@/hooks/useSubmitPhoto";
import LottieView from "lottie-react-native";
import { Circle, Path, Svg, SvgProps } from "react-native-svg";

const CAMERA_ICON_SIZE = 64;
const OTHER_ICON_SIZE = 24;

const Shutter = (props: SvgProps) => (
  <Svg width={73} height={72} viewBox="0 0 73 72" fill="none" {...props}>
    <Circle cx={36.4987} cy={35.9995} r={27.6667} fill="white" />
    <Path
      d="M72.5 36C72.5 55.8823 56.3823 72 36.5 72C16.6177 72 0.5 55.8823 0.5 36C0.5 16.1177 16.6177 0 36.5 0C56.3823 0 72.5 16.1177 72.5 36ZM4.98105 36C4.98105 53.4074 19.0926 67.519 36.5 67.519C53.9074 67.519 68.019 53.4074 68.019 36C68.019 18.5926 53.9074 4.48105 36.5 4.48105C19.0926 4.48105 4.98105 18.5926 4.98105 36Z"
      fill="white"
    />
  </Svg>
);

const PhotoPreview = ({
  image,
  onClose,
  objectiveId,
}: {
  image: CameraCapturedPicture;
  onClose: () => void;
  objectiveId: string;
}) => {
  const { saveImage, loading } = useSubmitPhoto(objectiveId);
  const [submited, setSubmited] = useState(false);

  const handleSend = async () => {
    await saveImage(image, () => setSubmited(true));
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
          <TouchableOpacity onPress={onClose} activeOpacity={0.5}>
            <Feather name="x" size={44} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSend}
            activeOpacity={0.5}
            style={{
              backgroundColor: "rgba(5,4,2,0.7)",
              padding: 10,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: "rgba(255,255,255,0.7)",
            }}
          >
            <Feather name="send" size={24} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const CameraComponent = ({ objectiveId }: { objectiveId: string }) => {
  const [type, setType] = useState<CameraType>("back");
  const [flash, setFlash] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [loading, setLoading] = useState(false);

  function toggleCameraType() {
    setType((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((current) => !current);
  }

  async function takePicture() {
    // console.log(await cameraRef.current?.getAvailablePictureSizesAsync());

    if (cameraRef.current && cameraReady) {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      const source = photo?.base64;
      if (source) {
        setImage(photo);
        setLoading(false);
      }
      // console.log(photo);
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
          <CameraView
            style={styles.camera}
            facing={type}
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
            enableTorch={flash}
          />
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={goBack}
              activeOpacity={0.5}
              disabled={loading}
            >
              <Feather name="x" size={44} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
            {type === "back" ? (
              <TouchableOpacity
                disabled={loading}
                onPress={toggleFlash}
                activeOpacity={0.5}
                style={{
                  backgroundColor: "rgba(5,4,2,0.7)",
                  padding: 8,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.7)",
                }}
              >
                {flash ? (
                  <Feather
                    name="zap-off"
                    size={OTHER_ICON_SIZE}
                    color="rgba(255,255,255,0.7)"
                  />
                ) : (
                  <Feather
                    name="zap"
                    size={OTHER_ICON_SIZE}
                    color="rgba(255,255,255,0.7)"
                  />
                )}
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.bottomBar}>
            <TouchableOpacity
              disabled={loading}
              onPress={pickImage}
              activeOpacity={0.5}
              style={{
                backgroundColor: "rgba(5,4,2,0.7)",
                padding: 10,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: "rgba(255,255,255,0.7)",
              }}
            >
              <Feather
                name="aperture"
                size={30}
                color="rgba(255,255,255,0.7)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              activeOpacity={0.5}
              disabled={loading}
            >
              <Shutter />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              onPress={toggleCameraType}
              activeOpacity={0.5}
              style={{
                backgroundColor: "rgba(5,4,2,0.7)",
                padding: 10,
                borderRadius: 50,
                borderWidth: 3,
                borderColor: "rgba(255,255,255,0.7)",
              }}
            >
              <MaterialCommunityIcons
                name="camera-flip"
                size={30}
                color="rgba(255,255,255,0.7)"
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
    //aspectRatio: 1,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.7)",
    zIndex: 3,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 34,
    paddingHorizontal: 16,
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
});
