import SecondaryButton from "@/components/buttons/SecondaryButton";
import ObjectiveCard from "@/components/cards/ObjectiveCard";
import { Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Objectives = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <View>
        <Text style={styles.title}>Continua tus</Text>
        <Text style={[styles.title, { fontFamily: "Poppins_500Medium" }]}>
          objetivos
        </Text>
      </View>
      <ObjectiveCard />
      <SecondaryButton
        onPress={() => {}}
        icon={<Feather name="camera" size={24} />}
        iconPosition="left"
        textStyles={{ fontFamily: "Poppins_500Medium", fontSize: 20 }}
        disabled
      >
        11:24 hasta siguiente foto
      </SecondaryButton>
      <View style={{ width: "100%", height: 2, backgroundColor: "#51C878" }} />
      <View>
        <Text style={styles.othersTitle}>Otros objetivos:</Text>
        <SecondaryButton
          onPress={() => {}}
          icon={<Feather name="plus-circle" size={24} />}
        >
          Agregar objetivo
        </SecondaryButton>
      </View>
    </ScrollView>
  );
};
export default Objectives;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    gap: 16,
  },
  title: {
    fontSize: 40,
    fontFamily: "Poppins_300Light",
  },
  card: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  othersTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600Semibold",
    marginBottom: 16,
  },
});
