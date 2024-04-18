import { Objective } from "@/utils/types";
import { StyleSheet, Text, View } from "react-native";

const dots = Array.from({ length: 12 }, (_, i) => i);

const ObjectiveCard = ({ objective }: { objective: Objective }) => (
  <View>
    <View style={styles.cardBody}>
      {/* <Text style={styles.bodyTitle}>
        Comenzado el: {objective.startingDate}
      </Text> */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 20,
        }}
      >
        {dots.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i < 4 && styles.completedDot]}
          ></View>
        ))}
      </View>
      <Text style={styles.bodySubtitle}>🔥 Racha de 4 dias</Text>
    </View>
    <View style={styles.cardFooter}>
      <Text style={styles.footerTitle}>{objective.title}</Text>
      <Text style={styles.footerSubtitle}>
        {objective.files.length}/{objective.totalDays} dias
      </Text>
    </View>
  </View>
);

export default ObjectiveCard;

const styles = StyleSheet.create({
  cardBody: {
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#CAE7CB",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  cardFooter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#51C878",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bodyTitle: {
    fontSize: 20,
    fontFamily: "Poppins_300Light",
  },
  bodySubtitle: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
  footerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
  },
  footerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(0, 0, 0, 0.5)",
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  completedDot: {
    backgroundColor: "#51C878",
  },
});
