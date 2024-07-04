import CustomPicker from "@/components/buttons/CustomPicker";
import MiniPhotoCard from "@/components/cards/MiniPhotoCard";
import CompletedObjective from "@/components/popups/CompletedObjective";
import HomeTextSkeleton from "@/components/skeletons/HomeTextSkeleton";
import useCalculateRemainingTime from "@/hooks/useCalculateRemainingTime";
import useObjectiveDetails from "@/hooks/useObjectiveDetails";
import { Objective } from "@/utils/types";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import EmptyHome from "./EmptyHome";

const ContentHome = ({ objectives }: { objectives: Objective[] | [] }) => {
  const {
    cardsToShow,
    files,
    handleValueChange,
    options,
    selectedObjective,
    showCompletationPopup,
    selectedValue,
  } = useObjectiveDetails(objectives);
  const { loadingText, textToShow } =
    useCalculateRemainingTime(selectedObjective);

  return (
    <>
      {objectives.length > 0 && showCompletationPopup() && (
        <CompletedObjective objectiveId={selectedObjective?.id} />
      )}
      <FlatList
        contentContainerStyle={{ paddingVertical: 20, flexGrow: 1 }}
        ListHeaderComponentStyle={
          objectives.length > 0 && {
            gap: 24,
            marginBottom: 24,
          }
        }
        ListHeaderComponent={() =>
          objectives.length > 0 && (
            <>
              <Text style={styles.title}>Objetivo del dia</Text>
              <View style={styles.bar}>
                <CustomPicker
                  options={options}
                  selectedValue={selectedValue}
                  onValueChange={handleValueChange}
                />
                <Text style={styles.helperText}>
                  {files.length}/{selectedObjective?.totalDays} dias
                </Text>
              </View>

              {loadingText ? (
                <HomeTextSkeleton />
              ) : selectedObjective?.completed ? (
                <View>
                  <Text style={styles.subtitle}>Objetivo completado</Text>
                  <Link
                    href={`/home/${selectedObjective.id}`}
                    style={styles.link}
                  >
                    Ir al resultado
                  </Link>
                </View>
              ) : (
                <Text style={styles.subtitle}>{textToShow}</Text>
              )}
            </>
          )
        }
        data={cardsToShow}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) =>
          item.isPlaceholder ? (
            <View style={{ flex: 1, aspectRatio: 1 }} />
          ) : (
            <MiniPhotoCard
              index={index}
              imageUrl={selectedObjective?.files[index]?.url}
              objectiveId={selectedObjective?.id}
              file={item}
            />
          )
        }
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "flex-start", gap: 10 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={<EmptyHome />}
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
  link: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "#51C878",
  },
});
