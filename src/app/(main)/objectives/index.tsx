import SecondaryButton from "@/components/buttons/SecondaryButton";
import ObjectiveCard from "@/components/cards/ObjectiveCard";
import { useSession } from "@/context/ctx";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { db } from "root/config/firebase";

const Objectives = () => {
  const { session } = useSession();
  const [objectives, setObjectives] = useState<string[]>([]);

  async function getData() {
    try {
      const uid = session?.uid as string;
      const q = query(
        collection(db, `users/${uid}/objectives`),
        orderBy("title")
      );
      const objectivesRef = await getDocs(q);
      objectivesRef.forEach((doc) => {
        setObjectives((prev) => [...prev, doc.data().title]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <View>
        <Text style={styles.title}>Continua tus</Text>
        <Text style={[styles.title, { fontWeight: "500" }]}>objetivos</Text>
      </View>
      <ObjectiveCard />
      <SecondaryButton
        onPress={() => {}}
        icon={<Feather name="camera" size={24} />}
        iconPosition="left"
        textStyles={{ fontWeight: "500", fontSize: 20 }}
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
    gap: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "100",
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
    fontWeight: "600",
    marginBottom: 16,
  },
});
