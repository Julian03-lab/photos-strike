import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { deleteDoc, doc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { db } from "root/config/firebase";

const useDeleteDoc = (): [(documentId: string) => Promise<void>, boolean] => {
  const { session } = useSession();
  const { removeObjective } = useObjectivesStore();

  const [loading, setLoading] = useState(false);

  const handleDelete = async (documentId: string) => {
    try {
      setLoading(true);
      const batch = writeBatch(db);
      batch.delete(doc(db, `users/${session?.uid}/objectives/${documentId}`));
      batch.delete(
        doc(db, `users/${session?.uid}/objectives/${documentId}/files`)
      );
      await batch.commit();
      setTimeout(() => {
        removeObjective(documentId);
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "El objetivo se elimino con exito",
          visibilityTime: 4000,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error al eliminar el objetivo",
        visibilityTime: 4000,
      });
      setLoading(false);
    }
  };

  return [handleDelete, loading];
};
export default useDeleteDoc;
