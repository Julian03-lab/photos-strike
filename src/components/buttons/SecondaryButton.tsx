import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type SecondaryButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
};

const SecondaryButton = ({ icon, onPress, children }: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{children}</Text>
      {icon}
    </TouchableOpacity>
  );
};
export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#CAE7CB",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});
