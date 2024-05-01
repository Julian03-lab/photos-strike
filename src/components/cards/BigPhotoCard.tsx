import { Feather } from "@expo/vector-icons";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type BigPhotoCardProps = {
  src: string | undefined;
  photoOpened: boolean;
  closePhoto: () => void;
};

const BigPhotoCard = ({ src, photoOpened, closePhoto }: BigPhotoCardProps) => {
  return (
    <Modal
      visible={photoOpened}
      transparent={true}
      animationType="fade"
      onRequestClose={closePhoto}
    >
      <TouchableWithoutFeedback onPress={closePhoto}>
        <View style={styles.centeredView}>
          <Pressable>
            <View>
              <TouchableOpacity
                onPress={closePhoto}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 1,
                }}
              >
                <Feather name="x" size={48} color="white" />
              </TouchableOpacity>
              <Image
                source={{ uri: src }}
                style={{
                  width: "100%",
                  aspectRatio: 9 / 16,
                }}
              />
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default BigPhotoCard;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 20,
  },
});
