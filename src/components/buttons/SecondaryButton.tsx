import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";

interface SecondaryButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  onPress: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  textStyles?: StyleProp<TextStyle>;
}

const SecondaryButton = ({
  icon,
  onPress,
  children,
  iconPosition,
  textStyles,
  ...props
}: SecondaryButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[
        styles.button,
        { flexDirection: iconPosition === "left" ? "row-reverse" : "row" },
      ]}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyles]}>{children}</Text>
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
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});
