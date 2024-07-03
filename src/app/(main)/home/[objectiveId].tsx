import PrimaryButton from "@/components/buttons/PrimaryButton";
import ResultScrollBar from "@/components/home/ResultScrollBar";
import { useObjectivesStore } from "@/context/store";
import { Feather } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ObjectiveResult = () => {
  const { objectiveId } = useGlobalSearchParams();
  const objective = useObjectivesStore().getObjective(objectiveId as string);
  const [selectedDay, setSelectedDay] = useState(0);

  if (!objective) return null;

  const objectiveCompletedDays = objective?.files.length;
  const objectiveEmptyDays = objective?.totalDays - objectiveCompletedDays;

  const fullDays =
    objectiveEmptyDays === 0
      ? objective.files
      : [
          ...objective?.files,
          ...Array.from({ length: objective?.totalDays }, (_) => ({
            empty: true,
          })),
        ];

  const completedDays = fullDays
    .map((day, index) => {
      if (day.empty) return day;
      return {
        ...day,
        index,
      };
    })
    .filter((day) => !day.empty);

  console.log(fullDays, completedDays);

  const handleNextDay = () => {
    if (selectedDay === completedDays.length - 1) return;
    setSelectedDay((prev) => prev + 1);
  };

  const handlePreviousDay = () => {
    if (selectedDay === 0) return;
    setSelectedDay((prev) => prev - 1);
  };

  // console.log(selectedDay, completedDays.length);

  const findDayIndex = (url: string) => {
    const index = completedDays.findIndex((day) => day.url === url);
    setSelectedDay(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => router.navigate("home")}>
            <Feather name="arrow-left" size={32} />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={2}>
            {objective?.title}
          </Text>
        </View>
      </View>
      {/* <Text style={styles.subtitle}>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
          }}
        >
          Total:
        </Text>{" "}
        {objectiveCompletedDays}/{objective?.totalDays} dias
      </Text> */}
      {/* Content */}
      <View style={styles.content}>
        {selectedDay > 0 ? (
          <TouchableOpacity onPress={handlePreviousDay}>
            <Feather name="arrow-left-circle" size={32} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}
        <Image
          source={{ uri: completedDays[selectedDay].url }}
          style={styles.image}
        />
        {selectedDay < completedDays.length - 1 ? (
          <TouchableOpacity onPress={handleNextDay}>
            <Feather name="arrow-right-circle" size={32} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}
      </View>
      {/* Bar */}
      <ResultScrollBar
        fullDays={fullDays}
        selectedDayUrl={completedDays[selectedDay].url}
        handlePress={findDayIndex}
      />
      {/* Button */}
      <View style={{ paddingHorizontal: 20 }}>
        <PrimaryButton
          onPress={() => null}
          textStyles={{
            fontSize: 18,
            fontFamily: "Poppins_500Medium",
          }}
        >
          Ver comparacion final
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};
export default ObjectiveResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
    gap: 16,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 28,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  image: {
    height: "100%",
    flex: 1,
    borderRadius: 20,
  },
});
