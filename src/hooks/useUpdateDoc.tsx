import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { db } from "root/config/firebase";

const useUpdateDoc = (): [
  (documentId: string, newData: any) => Promise<void>,
  boolean
] => {
  const { session } = useSession();
  const { updateObjective } = useObjectivesStore();

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (documentId: string, newData: any) => {
    try {
      setLoading(true);
      await updateDoc(
        doc(db, `users/${session?.uid}/objectives/${documentId}`),
        newData
      );
      updateObjective(documentId, newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [handleUpdate, loading];
};
export default useUpdateDoc;
