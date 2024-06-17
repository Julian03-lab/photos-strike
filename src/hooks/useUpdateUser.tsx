import { useSession } from "@/context/ctx";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "root/config/firebase";

const useUpdateUser = (): [(newData: any) => Promise<void>, boolean] => {
  const { session } = useSession();

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newData: any) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, `users/${session?.uid}`), newData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [handleUpdate, loading];
};
export default useUpdateUser;
