import { View, StyleSheet, ActivityIndicator } from "react-native";
import EmptyHome from "@/screens/home/EmptyHome";
import ContentHome from "@/screens/home/ContentHome";
import useFetchObjectives from "@/hooks/useFetchObjectives";

const HomePage = (): React.JSX.Element => {
  const { loading, objectives } = useFetchObjectives();

  console.log("todos: ", objectives);

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
