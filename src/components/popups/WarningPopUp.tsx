import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

const WarningPopUp = ({
  open,
  handleOpen,
  callback,
  subtitle,
  title,
  buttonTitle,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  callback: () => void;
  title: string;
  subtitle?: string;
  buttonTitle: string;
}) => {
  const closeModal = () => {
    handleOpen(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View
                style={{
                  backgroundColor: "#FFEBEB",
                  alignSelf: "flex-start",
                  padding: 10,
                  borderRadius: 100,
                }}
              >
                <Feather
                  name="alert-circle"
                  size={24}
                  color="#DC0303"
                  style={{
                    backgroundColor: "#FEC7C7",
                    padding: 8,
                    borderRadius: 100,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 12,
                  marginBottom: 24,
                  gap: 4,
                }}
              >
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={callback}
                >
                  <Text style={styles.buttonText}>{buttonTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={closeModal}>
                  <Text style={styles.skip}>Cancelar</Text>
                </TouchableOpacity>
              </View>
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#101828",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#475467",
  },
  button: {
    backgroundColor: "#DC0303",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  skip: {
    color: "#DC0303",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default WarningPopUp;
