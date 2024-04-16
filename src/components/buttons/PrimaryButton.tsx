import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";

interface PrimaryButtonProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  onPress: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  textStyles?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  loading?: boolean;
}

const PrimaryButton = ({
  loading,
  icon,
  onPress,
  children,
  iconPosition,
  textStyles,
  ...props
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      disabled={loading}
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
      {!loading ? (
        <>
          <Text style={[styles.buttonText, textStyles]}>{children}</Text>
          {icon}
        </>
      ) : (
        <ActivityIndicator color="#fff" size={24} />
      )}
    </TouchableOpacity>
  );
};
export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#51C878",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#fff",
  },
});
