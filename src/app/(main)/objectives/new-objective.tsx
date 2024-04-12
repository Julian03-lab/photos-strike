import { useSession } from "@/context/ctx";
import { addDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { db } from "root/config/firebase";

const NewObjective = () => {
  const { session } = useSession();
  const [objective, setObjective] = useState<string>("");

  async function addObjective() {
    try {
      const uid = session?.uid;
      const userRef = doc(db, `users/${uid}`);
      const objectiveRef = await addDoc(collection(userRef, "objectives"), {
        title: objective,
        completed: false,
      });

      console.log("add objective: ", objectiveRef.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text>NewObjective</Text>
      <Text>Objective: {objective}</Text>
      <TextInput placeholder="Objective" onChangeText={setObjective} />
      <Button title="Add Objective" onPress={addObjective} />
    </View>
  );
};
export default NewObjective;
