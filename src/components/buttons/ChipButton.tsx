import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ChipProps = {
  value: string | number;
  label: string;
  selectedChip: string | number;
  setSelectedChip: (chip: any) => void;
  canDeselect?: boolean;
};

const Chip = ({
  value,
  label,
  selectedChip,
  setSelectedChip,
  canDeselect,
}: ChipProps) => {
  console.log(selectedChip, value);

  const handlePress = () => {
    if (selectedChip === value && selectedChip !== "" && canDeselect) {
      setSelectedChip("");
    } else {
      setSelectedChip(value);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        selectedChip === value
          ? { backgroundColor: "#51C878" }
          : { backgroundColor: "#CAE7CB" },
        styles.button,
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: { fontSize: 14, fontFamily: "Poppins_500Medium", color: "#000" },
});
