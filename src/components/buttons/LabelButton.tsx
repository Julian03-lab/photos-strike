import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

interface LabelButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  onPress: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  textStyles?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  label?: string;
}

const LabelButton = ({
  icon,
  onPress,
  children,
  iconPosition,
  textStyles,
  label,
  ...props
}: LabelButtonProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        {...props}
        onPress={onPress}
        style={[
          styles.button,
          {
            flexDirection: iconPosition === "left" ? "row-reverse" : "row",
            width: props.fullWidth ? "100%" : "auto",
          },
        ]}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, textStyles]}>{children}</Text>
        {icon}
      </TouchableOpacity>
    </View>
  );
};
export default LabelButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,

    backgroundColor: "#CAE7CB",
    borderRadius: 20,
    gap: 10,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#0f0f0f",
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
});
