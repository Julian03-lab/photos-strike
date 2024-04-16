import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

type Option = { label: string; value: string };

type CustomPickerProps = {
  options: Option[];
  selectedValue: { label: string; value: string };
  onValueChange: (value: { label: string; value: string }) => void;
};

const CustomPicker = ({
  options,
  selectedValue,
  onValueChange,
}: CustomPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }: { item: Option }) => (
    <TouchableOpacity
      onPress={() => {
        onValueChange(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.option}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleDismiss = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleDismiss}
        style={styles.selector}
        activeOpacity={0.7}
      >
        <Text style={styles.selectorText}>{selectedValue.label}</Text>
        <Feather name="chevron-down" size={24} />
      </TouchableOpacity>
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 20,
                    paddingHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 18,
                    }}
                  >
                    Selecciona una opción
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Feather name="x" size={24} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={options}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.value}
                  ItemSeparatorComponent={() => (
                    <View style={{ height: 1, backgroundColor: "#ccc" }} />
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
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
    // paddingVertical: 20,
    // alignItems: "center",
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

export default CustomPicker;
