import CustomPicker from "@/components/buttons/CustomPicker";
import MiniPhotoCard from "@/components/cards/MiniPhotoCard";
import formatDate from "@/utils/formatDate";
import { Objective } from "@/utils/types";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Option = { label: string; value: string };

const ContentHome = ({ objectives }: { objectives: Objective[] }) => {
  const options = useMemo<Option[]>(
    () =>
      objectives.map((item) => ({
        label: item.title,
        value: item.id,
      })),
    [objectives]
  );
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const selectedObjective = useMemo(
    () =>
      objectives.find((item) => item.id === selectedValue.value) ||
      objectives[0],
    [selectedValue, objectives]
  );
  const files = useMemo(() => selectedObjective.files, [selectedObjective]);

  const nextPhotoDays = dayjs().diff(
    formatDate(selectedObjective.startingDate),
    "day"
  );

  const cardsToShow = files.concat(
    Array.from({ length: selectedObjective.totalDays - files.length }).map(
      (_, index) => ({
        unlocked: index + files.length === nextPhotoDays,
      })
    )
  );

  const handleValueChange = (value: Option) => {
    setSelectedValue(value);
  };

  // console.log(selectedObjective.startingDate);

  return (
    <FlatList
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
      renderItem={({ item, index }) => (
        <MiniPhotoCard index={index} {...item} />
      )}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: "center", gap: 10 }}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    />
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
