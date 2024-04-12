import { useSession } from "@/context/ctx";
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
import { View, Text } from "react-native";
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
    <View>
      <Text>Objectives</Text>
      {objectives.map((objective, index) => (
        <Text key={index}>{objective}</Text>
      ))}
      <Text>-------------------</Text>
      <Link href={"/(main)/objectives/new-objective"}>New Objective</Link>
    </View>
  );
};
export default Objectives;
