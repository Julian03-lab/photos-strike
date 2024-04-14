import { View, StyleSheet } from "react-native";
import EmptyHome from "@/screens/home/EmptyHome";
import ContentHome from "@/screens/home/ContentHome";

const HomePage = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <ContentHome />
      {/* <EmptyHome /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomePage;
