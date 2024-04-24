import useUpdateDoc from "@/hooks/useUpdateDoc";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const CompletedObjective = ({ objectiveId }: { objectiveId: string }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [updateDoc] = useUpdateDoc();

  const handleDismiss = () => {
    setModalVisible(!modalVisible);
    updateDoc(objectiveId, { viewed: true });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleDismiss}
    >
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text>Felicidades</Text>
              <LottieView
                source={require("root/assets/animations/win.json")}
                autoPlay
                // loop
                style={{ width: 300, height: 300 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  selectorText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#51C878",
  },
});

export default CompletedObjective;
