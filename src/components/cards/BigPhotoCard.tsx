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
import UnlockButton from "../buttons/UnlockButton";
import { useObjectivesStore } from "@/context/store";
import useUpdatePoints from "@/hooks/useUpdatePoints";
import useUpdateFile from "@/hooks/useUpdateFile";

type BigPhotoCardProps = {
  src: string | undefined;
  photoOpened: boolean;
  closePhoto: () => void;
  available: boolean;
  fileId: string;
  objectiveId: string;
};

const BigPhotoCard = ({
  src,
  photoOpened,
  closePhoto,
  available,
  fileId,
  objectiveId,
}: BigPhotoCardProps) => {
  const { updateFile } = useObjectivesStore();
  const { handleUpdate: handleUpdatePoints, loading } = useUpdatePoints();
  const [handleUpdateDbFile] = useUpdateFile();

  const handlePress = () => {
    handleUpdatePoints(-150);
    handleUpdateDbFile(objectiveId, fileId, { bigView: true });
    updateFile(objectiveId, fileId, { bigView: true });
  };

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
            <View
              style={{
                justifyContent: "center",
              }}
            >
              {!available && (
                <UnlockButton onPress={handlePress} loading={loading} />
              )}
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
                blurRadius={available ? 0 : 45}
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
