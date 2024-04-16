import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface StyledInputProps extends React.ComponentProps<typeof TextInput> {
  label?: string;
  value: string;
}

const StyledInput = ({
  onChangeText,
  placeholder,
  value,
  label,
}: StyledInputProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={focused ? styles.focused : styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={"rgba(0,0,0,0.4)"}
        value={value}
      />
    </View>
  );
};
export default StyledInput;
const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#0f0f0f",
    backgroundColor: "#CAE7CB",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CAE7CB",
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  focused: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#0f0f0f",
    backgroundColor: "#CAE7CB",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#51C878",
  },
});
