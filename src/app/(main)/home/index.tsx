import { View, StyleSheet, ActivityIndicator } from "react-native";
import EmptyHome from "@/screens/home/EmptyHome";
import ContentHome from "@/screens/home/ContentHome";
import useFetchObjectives from "@/hooks/useFetchObjectives";
import { useRef } from "react";
import LottieView from "lottie-react-native";

const HomePage = (): React.JSX.Element => {
  const { loading, objectives } = useFetchObjectives();
  const animation = useRef(null);

  // console.log("todos: ", objectives);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {objectives.length > 0 ? (
        <ContentHome objectives={objectives} />
      ) : (
        <EmptyHome />
      )}
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
