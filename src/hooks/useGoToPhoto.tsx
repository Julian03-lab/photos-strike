import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

const useGoToPhoto = () => {
  const [permission, requestPermission] = useCameraPermissions();

  async function goToTakePhoto() {
    // if (permission?.canAskAgain === false && permission?.status !== "granted") {
    //   return Linking.openSettings();
    // }

    if (permission?.status === "granted") {
      router.push("/home/take-photo");
    } else {
      const result = await requestPermission();
      if (result.status === "granted") {
        router.push("/home/take-photo");
      }
    }
  }
  return { goToTakePhoto };
};
export default useGoToPhoto;
