import CameraComponent from "@/components/CameraComponent";
import { useGlobalSearchParams } from "expo-router";
import { View, Text } from "react-native";
const TakePhoto = () => {
  const { objectiveId } = useGlobalSearchParams();

  console.log(objectiveId);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <CameraComponent objectiveId={objectiveId as string} />
    </View>
  );
};
export default TakePhoto;
