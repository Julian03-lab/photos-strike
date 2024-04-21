import SecondaryButton from "@/components/buttons/SecondaryButton";
import IndividualObjectiveCard from "@/components/cards/IndividualObjectiveCard";
import ObjectiveCard from "@/components/cards/ObjectiveCard";
import useFetchObjectives from "@/hooks/useFetchObjectives";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const Objectives = () => {
  const { loading, objectives } = useFetchObjectives();

  const mainObjectives = useMemo(
    () => objectives.filter((objective) => objective.principal),
    [objectives]
  );

  console.log("📁Archivo: index.tsx | Linea: 24 | objectives -> ", objectives);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      {mainObjectives.length > 0 && (
        <>
          <View>
            <Text style={styles.title}>Objetivos Principales</Text>
          </View>
          {mainObjectives.map((objective) => (
            <ObjectiveCard key={objective.id} objective={objective} />
          ))}
          <View
            style={{ width: "100%", height: 2, backgroundColor: "#51C878" }}
          />
        </>
      )}
      <View>
        <Text style={styles.othersTitle}>Todos los objetivos:</Text>
        {!loading ? (
          <View
            style={{
              gap: 20,
            }}
          >
            {objectives.map((objective) => (
              <IndividualObjectiveCard
                key={objective.id}
                objective={objective}
              />
            ))}
            <SecondaryButton
              onPress={() => router.push("/(main)/objectives/new-objective")}
              icon={<Feather name="plus-circle" size={24} />}
            >
              Agregar objetivo
            </SecondaryButton>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#51C878" />
        )}
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
    fontSize: 36,
    fontFamily: "Poppins_500Medium",
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
