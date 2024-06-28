import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ResultScrollBarProps = {
  fullDays: {
    empty?: boolean;
    url?: string;
  }[];
  selectedDayUrl: string;
  handlePress: (url: string) => void;
};

const ResultScrollBar = ({
  fullDays,
  selectedDayUrl,
  handlePress,
}: ResultScrollBarProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={styles.bottomBar}
    >
      {fullDays.map((day, index) => (
        <TouchableOpacity
          disabled={day.empty || selectedDayUrl === day.url}
          onPress={() => handlePress(day.url as string)}
          key={index}
          style={[
            styles.buttonBase,
            day.empty
              ? styles.emptyDay
              : selectedDayUrl === day.url
              ? styles.selectedDay
              : styles.unselectedDay,
          ]}
        >
          <Text style={styles.text}>{day.empty ? "X" : index + 1}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
export default ResultScrollBar;

const styles = StyleSheet.create({
  bottomBar: {
    gap: 8,
    paddingHorizontal: 20,
    // backgroundColor: "red",
  },
  buttonBase: {
    width: 64,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "flex-end",
    borderWidth: 2,
    borderColor: "#CAE7CB",
  },
  selectedDay: {
    backgroundColor: "#51C878",
  },
  unselectedDay: {
    backgroundColor: "#CAE7CB",
  },
  emptyDay: {
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
  },
});
