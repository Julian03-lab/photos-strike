import { Camera } from "expo-camera";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking,
} from "react-native";

const HomePage = (): React.JSX.Element => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  console.log(permission);

  async function goToTakePhoto() {
    if (permission?.canAskAgain === false && permission?.status !== "granted") {
      return Linking.openSettings();
    }

    if (permission?.status === "granted") {
      router.push("/take-photo");
    } else {
      const result = await requestPermission();
      if (result.status === "granted") {
        router.push("/take-photo");
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text>Pagina principal</Text>
      <TouchableHighlight onPress={goToTakePhoto}>
        <Text>Sacar foto</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomePage;
