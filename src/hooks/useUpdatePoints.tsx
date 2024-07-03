import { useSession } from "@/context/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, runTransaction } from "firebase/firestore";
import { useState } from "react";
import { db } from "root/config/firebase";

const useUpdatePoints = () => {
  const { session, setSession } = useSession();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newPoints: number) => {
    if (!session) return;

    const userRef = doc(db, "users", session?.uid as string);

    try {
      setLoading(true);
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(userRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        const points = sfDoc.data().points + newPoints;
        transaction.update(userRef, { points: points });
        const finalUser = { ...session, points: points };
        setSession(finalUser);
        await AsyncStorage.setItem("@user", JSON.stringify(finalUser));
      });
    } catch (e) {
      console.log("Transaction failed: ", e);
    } finally {
      // setLoading(false);
    }
  };

  return { handleUpdate, loading };
};

export default useUpdatePoints;
