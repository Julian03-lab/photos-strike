import { useSession } from "@/context/ctx";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "root/config/firebase";

const useFetchObjectives = () => {
  const { session } = useSession();
  const [objectives, setObjectives] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return { objectives, loading };
};

export default useFetchObjectives;
