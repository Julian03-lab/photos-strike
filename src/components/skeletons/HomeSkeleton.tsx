import { StyleSheet, Text, View } from "react-native";
import HomeTextSkeleton from "./HomeTextSkeleton";
import { Skeleton } from "react-native-skeletons";
const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton height={65} />
      <Skeleton height={38} />
      <HomeTextSkeleton />
      <Skeleton height={300} />
    </View>
  );
};
export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },
});
