import { Feather } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CardProps = {
  day: number;
  locked: boolean;
};

const Card = ({ day, locked = true }: CardProps) => {
  return (
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        borderWidth: 1,
        borderColor: locked ? "rgba(0,0,0,1)" : "#51C878",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Dia {day}
      </Text>
      {locked ? (
        <Feather name="lock" size={24} />
      ) : (
        <Feather name="unlock" size={24} color={"#51C878"} />
      )}
    </View>
  );
};

const cardList = [
  {
    day: 1,
    locked: false,
  },
  {
    day: 2,
    locked: true,
  },
  {
    day: 3,
    locked: true,
  },
  {
    day: 4,
    locked: true,
  },
  {
    day: 5,
    locked: true,
  },
  {
    day: 6,
    locked: true,
  },
  {
    day: 7,
    locked: true,
  },
  {
    day: 8,
    locked: true,
  },
  {
    day: 9,
    locked: true,
  },
  {
    day: 10,
    locked: true,
  },
  {
    day: 11,
    locked: true,
  },
  {
    day: 12,
    locked: true,
  },
  {
    day: 13,
    locked: true,
  },
  {
    day: 14,
    locked: true,
  },
  {
    day: 15,
    locked: true,
  },
  {
    day: 16,
    locked: true,
  },
  {
    day: 17,
    locked: true,
  },
  {
    day: 18,
    locked: true,
  },
  {
    day: 19,
    locked: true,
  },
  {
    day: 20,
    locked: true,
  },
  {
    day: 21,
    locked: true,
  },
  {
    day: 22,
    locked: true,
  },
  {
    day: 23,
    locked: true,
  },
  {
    day: 24,
    locked: true,
  },
  {
    day: 25,
    locked: true,
  },
  {
    day: 26,
    locked: true,
  },
  {
    day: 27,
    locked: true,
  },
  {
    day: 28,
    locked: true,
  },
  {
    day: 29,
    locked: true,
  },
  {
    day: 30,
    locked: true,
  },
];

const ContentHome = () => {
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Objetivo del dia</Text>
          <View style={styles.bar}>
            <TouchableOpacity style={styles.selector}>
              <Text style={styles.selectorText}>Cambio fisico</Text>
              <Feather name="chevron-down" size={24} />
            </TouchableOpacity>
            <Text style={styles.helperText}>4/30 dias</Text>
          </View>
          <Text style={styles.subtitle}>Faltan 12:21 para la foto del dia</Text>
        </>
      }
      ListHeaderComponentStyle={{
        gap: 24,
        marginBottom: 24,
      }}
      data={cardList}
      keyExtractor={(item) => item.day.toString()}
      renderItem={({ item }) => <Card {...item} />}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: "space-between" }}
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
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: 45,
    fontWeight: "100",
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "500",
  },
  selectorText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#51C878",
  },
});
