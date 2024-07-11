import {
  type DimensionValue,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import type { Objective, Option } from "@/utils/types";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface OptionsProps {
  active: Option[];
  finished: Option[] | [];
}

type SelectorHeaderProps = {
  files: any;
  options: OptionsProps;
  selectedObjective: Objective;
  handleValueChange: (value: Option) => void;
  selectedValue: Option;
};

const INITIAL_HEIGHT = 65;

const SelectorHeader = ({
  selectedObjective,
  files,
  options,
  handleValueChange,
  selectedValue,
}: SelectorHeaderProps) => {
  const { width: windowsWidth } = useWindowDimensions();

  const height = useSharedValue("11%");

  const handlePress = () => {
    height.value = withTiming(height.value === "100%" ? "11%" : "100%", {
      duration: 300,
    });
  };

  const handleChange = (value: Option) => {
    handleValueChange(value);
    handlePress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value as DimensionValue,
    };
  });

  return (
    <>
      <View style={{ height: INITIAL_HEIGHT }} />
      <Animated.View
        style={[
          {
            width: windowsWidth,
            position: "absolute",
            backgroundColor: "#CAE7CB",
            overflow: "hidden",
            zIndex: 1,
            // borderRadius: 16,
            gap: 8,
          },
          animatedStyle,
        ]}
      >
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.bar}>
            <Text style={styles.title}>{selectedValue.label}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Text style={styles.helperText}>
                {files.length}/{selectedObjective?.totalDays} dias
              </Text>

              <Feather name="chevron-down" size={24} color="black" />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView>
          <View style={styles.optionContainer}>
            <Text style={styles.optionTitle}>Objetivos activos</Text>
            <View style={{ width: "100%", gap: 8 }}>
              {options.active.map((option) => (
                <TouchableHighlight
                  disabled={option.value === selectedValue.value}
                  onPress={() => handleChange(option)}
                  underlayColor={"#51C878"}
                  key={option.value}
                  style={{
                    width: "100%",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={
                      selectedValue.value === option.value
                        ? styles.selectedOption
                        : styles.option
                    }
                  >
                    {option.label}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.optionContainer}>
            <Text style={[styles.optionTitle, { color: "red" }]}>
              <Feather name="flag" size={24} color={"red"} /> Objetivos
              finalizados
            </Text>
            <View style={{ width: "100%", gap: 8 }}>
              {options.finished.map((option) => (
                <TouchableHighlight
                  disabled={option.value === selectedValue.value}
                  onPress={() => handleChange(option)}
                  underlayColor={"#51C878"}
                  key={option.value}
                  style={{
                    width: "100%",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                  }}
                >
                  <Text
                    style={
                      selectedValue.value === option.value
                        ? styles.selectedOption
                        : styles.option
                    }
                  >
                    {option.label}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};
export default SelectorHeader;
const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "#51C878",
  },
  helperText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "rgba(31,31,31,0.7)",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  separator: {
    height: 8,
    backgroundColor: "#51C878",
    width: "100%",
  },
  categoriesContainer: {
    alignItems: "center",
    gap: 8,
  },
  optionContainer: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
  },
  optionTitle: {
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
    color: "#000",
    textAlign: "center",
  },
  option: {
    fontSize: 24,
    fontFamily: "Poppins_400Regular",
    color: "#000",
    textAlign: "center",
  },
  selectedOption: {
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
    color: "#51C878",
    textAlign: "center",
  },
});
