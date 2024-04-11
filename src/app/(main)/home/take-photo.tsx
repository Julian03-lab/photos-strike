import CameraComponent from "@/components/CameraComponent";
import { View, Text } from "react-native";
const TakePhoto = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CameraComponent />
    </View>
  );
};
export default TakePhoto;
