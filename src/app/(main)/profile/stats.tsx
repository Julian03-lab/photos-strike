import CompletedDayPopup from "@/components/popups/CompletedDayPopup";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
const StatsScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text>StatsScreen</Text>
      <Button title="Open Modal" onPress={() => setModalOpen(true)} />
      <CompletedDayPopup
        open={modalOpen}
        handleOpen={setModalOpen}
        callback={() => null}
      />
      {/* <LottieView
        style={{ flex: 1 }}
        autoPlay
        loop
        source={require("root/assets/animations/streak.json")}
      /> */}
    </View>
  );
};
export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
