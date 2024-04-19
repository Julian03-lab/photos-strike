import { useSession } from "@/context/ctx";
import { addDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import { Alert } from "react-native";
import { db } from "root/config/firebase";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import formatDate from "@/utils/formatDate";
import { addObjectivesProps } from "@/utils/types";
import { useObjectivesStore } from "@/context/store";

const useAddObjective = (
  {
    endingDate,
    notificationTime,
    objective,
    startingDate,
    completed = false,
    notifications = true,
  }: addObjectivesProps,
  callback: () => void
) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(false);
  const { appendObjectives } = useObjectivesStore();

  async function addObjective() {
    if (!objective.trim())
      return Alert.alert("Error", "Necesitas poner el titulo del objetivo");

    setLoading(true);
    const newObjective = {
      title: objective.trim(),
      startingDate,
      endingDate,
      notificationTime: notificationTime,
      // frecuency: frecuency === 0 ? customFrecuency : frecuency,
      completed,
      notifications,
      principal: false,
      createdAt: new Date().toISOString(),
      totalDays: dayjs(formatDate(endingDate)).diff(
        dayjs(formatDate(startingDate)),
        "day"
      ),
      lastPhotoDate: null,
    };

    try {
      const uid = session?.uid;
      const userRef = doc(db, `users/${uid}`);
      const id = await addDoc(collection(userRef, "objectives"), newObjective);
      appendObjectives([{ id: id.id, ...newObjective, files: [] }]);
      Toast.show({
        type: "success",
        text1: "Objetivo agregado con exito",
        text2: `Se agregó el objetivo ${objective}`,
        visibilityTime: 4000,
      });
      callback();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al agregar el objetivo",
      });
    } finally {
      setLoading(false);
    }
  }
  return { loading, addObjective };
};
export default useAddObjective;
