import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "root/config/firebase";

const useUpdateFile = (): [
  (documentId: string, fileId: string, newData: any) => Promise<void>,
  boolean
] => {
  const { session } = useSession();
  const { updateObjective } = useObjectivesStore();

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (
    documentId: string,
    fileId: string,
    newData: any
  ) => {
    try {
      setLoading(true);
      updateObjective(documentId, newData);
      await updateDoc(
        doc(
          db,
          `users/${session?.uid}/objectives/${documentId}/files/${fileId}`
        ),
        newData
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [handleUpdate, loading];
};
export default useUpdateFile;
