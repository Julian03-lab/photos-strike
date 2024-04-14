import SecondaryButton from "@/components/buttons/SecondaryButton";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { NoObjectives } from "root/assets/svgs/noObjectives";
const EmptyHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todavía no tienes objetivos</Text>
      <Text style={styles.subtitle}>
        Crea un objetivo y visualiza el cambio✨
      </Text>
      <NoObjectives height={220} />
      <SecondaryButton
        onPress={() => router.push("/(main)/objectives/new-objective")}
        icon={<Feather name="plus-circle" size={24} color="black" />}
      >
        Agregar objetivo
      </SecondaryButton>
    </View>
  );
};
export default EmptyHome;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontFamily: "Poppins_300Light",
    width: "100%",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins_300Light",
    width: "100%",
  },
});
