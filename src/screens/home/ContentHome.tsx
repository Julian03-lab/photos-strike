import CustomPicker from "@/components/buttons/CustomPicker";
import MiniPhotoCard from "@/components/cards/MiniPhotoCard";
import CompletedObjective from "@/components/popups/CompletedObjective";
import formatDate from "@/utils/formatDate";
import { Objective } from "@/utils/types";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

var customParseFormat = require("dayjs/plugin/customParseFormat");

type Option = { label: string; value: string };

dayjs.extend(customParseFormat);

const ContentHome = ({ objectives }: { objectives: Objective[] }) => {
  // const { fetchObjectives } = useFetchObjectives();
  const options = useMemo<Option[]>(
    () =>
      objectives.map((item) => ({
        label: item.title,
        value: item.id,
      })),
    [objectives]
  );
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [visible, setVisible] = useState(false);
  const selectedObjective = useMemo(
    () =>
      objectives.find((item) => item.id === selectedValue.value) ||
      objectives[0],
    [selectedValue, objectives]
  );

  const showCompletationPopup = useMemo(
    () =>
      (selectedObjective.completed && !selectedObjective.viewed) ||
      dayjs().isAfter(dayjs(selectedObjective.endingDate, "DD-MM-YYYY"), "D"),
    [selectedObjective]
  );

  const files = useMemo(() => selectedObjective.files, [selectedObjective]);

  const nextPhotoDay = dayjs().diff(
    formatDate(selectedObjective.startingDate),
    "day"
  );

  const cardsToShow = files
    .concat(
      Array.from({ length: selectedObjective.totalDays - files.length }).map(
        (_, index) => ({
          unlocked: index + files.length === nextPhotoDay,
        })
      )
    )
    .concat(
      Array.from({
        length:
          selectedObjective.totalDays % 3 === 0
            ? 0
            : 3 - (selectedObjective.totalDays % 3),
      }).map((_, index) => ({
        isPlaceholder: true,
      }))
    );

  const handleValueChange = (value: Option) => {
    setSelectedValue(value);
  };

  return (
    <>
      {showCompletationPopup && (
        <CompletedObjective objectiveId={selectedObjective.id} />
      )}
      <FlatList
        contentContainerStyle={{ paddingVertical: 20 }}
        // onRefresh={fetchObjectives}
        // refreshing={false}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Objetivo del dia</Text>
            <View style={styles.bar}>
              <CustomPicker
                options={options}
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
              />
              <Text style={styles.helperText}>
                {files.length}/{selectedObjective.totalDays} dias
              </Text>
            </View>
            {/* <Text style={styles.subtitle}>Faltan 12:21 para la foto del dia</Text> */}
            <Text style={styles.subtitle}>Es momento de la foto 📷</Text>
          </>
        }
        ListHeaderComponentStyle={{
          gap: 24,
          marginBottom: 24,
        }}
        data={cardsToShow}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) =>
          item.isPlaceholder ? (
            <View style={{ flex: 1, aspectRatio: 1 }} />
          ) : (
            <MiniPhotoCard
              index={index}
              imageUrl={selectedObjective.files[index]?.url}
              objectiveId={selectedObjective.id}
              unlocked={item.unlocked}
              empty={item.empty}
            />
          )
        }
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "flex-start", gap: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        style={{
          paddingHorizontal: 20,
        }}
      />
    </>
  );
};

export default ContentHome;
const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  helperText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: 40,
    fontFamily: "Poppins_300Light",
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
  },
});
