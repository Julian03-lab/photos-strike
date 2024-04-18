import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "root/config/firebase";

const useDeleteDoc = () => {
  const { session } = useSession();
  const { removeObjective } = useObjectivesStore();

  const [loading, setLoading] = useState(false);

  const handleDelete = async (documentId: string) => {
    try {
      setLoading(true);
      await deleteDoc(
        doc(db, `users/${session?.uid}/objectives/${documentId}`)
      );
      setTimeout(() => {
        removeObjective(documentId);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return { loading, handleDelete };
};
export default useDeleteDoc;
