import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

interface FlatButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  onPress: () => void;
  children: React.ReactNode;
  textStyles?: StyleProp<TextStyle>;
  customStyles?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const FlatButton = ({
  onPress,
  children,
  textStyles,
  leftIcon,
  rightIcon,
  customStyles,
  ...props
}: FlatButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, customStyles]}
      activeOpacity={0.7}
      {...props}
    >
      {leftIcon}
      <Text style={[styles.buttonText, textStyles]}>{children}</Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "#EFEFEF",
    borderRadius: 16,
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    top: 2,
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "#1f1f1",
    flex: 1,
    lineHeight: 24,
  },
});
