import { useSession } from "@/app/context/ctx";
import { addDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { db } from "root/config/firebase";

const NewObjective = () => {
  const { session } = useSession();
  const [objective, setObjective] = useState<number>(1);

  async function addObjective() {
    try {
      const uid = session?.uid;
      const userRef = doc(db, `users/${uid}`);
      const objectiveRef = await addDoc(collection(userRef, "objectives"), {
        title: `Objective ${objective}`,
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
      <Button title="Increment" onPress={() => setObjective(objective + 1)} />
      <Button title="Add Objective" onPress={addObjective} />
    </View>
  );
};
export default NewObjective;
