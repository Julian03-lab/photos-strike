import { Link } from "expo-router";
import { View, Text } from "react-native";
const Objectives = () => {
  return (
    <View>
      <Text>Objectives</Text>
      <Link href={"/(main)/objectives/new-objective"}>New Objective</Link>
    </View>
  );
};
export default Objectives;
