import LottieView from "lottie-react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";

type OnBoardComponentProps = {
  image: React.JSX.Element;
  title: string;
  subtitle: string;
};

const { width } = Dimensions.get("window");

const OnBoardComponent = ({
  image,
  subtitle,
  title,
}: OnBoardComponentProps) => {
  return (
    <View
      style={{
        width,
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 20,
        overflow: "hidden",
      }}
    >
      {image}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};
export default OnBoardComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#000000",
    textAlign: "center",
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 12,
    flex: 0,
  },
});
