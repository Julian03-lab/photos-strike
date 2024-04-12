import { StyleSheet, View } from "react-native";

const CarouselPagination = ({
  SliderData,
  activeIndex,
}: {
  SliderData: any;
  activeIndex: number;
}) => {
  return (
    <View style={styles.pagination}>
      {SliderData.map((_: any, index: number) => (
        <View
          key={index.toString()}
          style={index === activeIndex ? styles.activeDot : styles.dot}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: "#CAE7CB",
  },

  activeDot: {
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: "#51C878",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 24,
    width: "100%",
    justifyContent: "center",
    gap: 12,
  },
});

export default CarouselPagination;
