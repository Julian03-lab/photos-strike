import MiniPhotoCard from "@/components/cards/MiniPhotoCard";
import CompletedObjective from "@/components/popups/CompletedObjective";
import useObjectiveDetails from "@/hooks/useObjectiveDetails";
import { FlatList, View } from "react-native";
import EmptyHome from "./EmptyHome";
import SelectorHeader from "@/components/home/SelectorHeader";
import NextPhotoInfo from "@/components/home/NextPhotoInfo";

const ContentHome = () => {
  const {
    cardsToShow,
    files,
    selectedObjective,
    showCompletationPopup,
    handleValueChange,
    options,
    selectedValue,
  } = useObjectiveDetails();

  // console.log(cardsToShow);

  return (
    <>
      {showCompletationPopup() && (
        <CompletedObjective objectiveId={selectedObjective?.id} />
      )}
      <SelectorHeader
        selectedObjective={selectedObjective}
        files={files}
        handleValueChange={handleValueChange}
        options={options}
        selectedValue={selectedValue}
      />
      <FlatList
        contentContainerStyle={{
          paddingVertical: 20,
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
        ListHeaderComponentStyle={{
          marginBottom: 24,
        }}
        ListHeaderComponent={() => (
          <NextPhotoInfo selectedObjective={selectedObjective} />
        )}
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
        style={{ width: "100%" }}
      />
    </>
  );
};

export default ContentHome;
