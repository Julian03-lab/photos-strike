import SecondaryButton from "@/components/buttons/SecondaryButton";
import IndividualObjectiveCard from "@/components/cards/IndividualObjectiveCard";
import ObjectiveCard from "@/components/cards/ObjectiveCard";
import { useObjectivesStore } from "@/context/store";
import useFetchObjectives from "@/hooks/useFetchObjectives";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router, Stack } from "expo-router";
import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const Objectives = () => {
  const { objectives } = useObjectivesStore();

  const mainObjectives = useMemo(
    () => objectives.filter((objective) => objective.principal),
    [objectives]
  );

  const finishedObjectives = useMemo(
    () =>
      objectives.filter(
        (objective) =>
          objective.completed ||
          dayjs().isAfter(dayjs(objective.endingDate, "DD-MM-YYYY"), "D")
      ),
    [objectives]
  );

  const activeObjectives = useMemo(
    () =>
      objectives.filter(
        (objective) =>
          !objective.completed &&
          dayjs().isBefore(dayjs(objective.endingDate, "DD-MM-YYYY"), "D")
      ),
    [objectives]
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <Stack.Screen
        options={{
          title: "Objetivos",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/(main)/objectives/new-objective")}
              style={{ marginRight: 16 }}
            >
              <Feather name="plus" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
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
        <Text style={styles.othersTitle}>
          <Feather name="check-circle" size={24} color={"#51C878"} /> Objetivos
          activos:
        </Text>

        <View
          style={{
            gap: 20,
          }}
        >
          {activeObjectives.map((objective) => (
            <IndividualObjectiveCard key={objective.id} objective={objective} />
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.othersTitle}>
          <Feather name="flag" size={24} color={"#51C878"} /> Objetivos
          finalizados:
        </Text>

        <View
          style={{
            gap: 20,
          }}
        >
          {finishedObjectives.map((objective) => (
            <IndividualObjectiveCard
              isFinished
              key={objective.id}
              objective={objective}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default Objectives;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
