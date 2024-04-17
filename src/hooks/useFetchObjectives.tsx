import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { Objective } from "@/utils/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "root/config/firebase";

const useFetchObjectives = () => {
  const { session } = useSession();
  const { objectives, setObjectives } = useObjectivesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = session?.uid as string;
    const q = query(
      collection(db, `users/${uid}/objectives`),
      orderBy("createdAt", "desc")
    );

    const fetchObjectives = async () => {
      const q = query(
        collection(db, `users/${uid}/objectives`),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);

      const objectives = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const objectiveData = doc.data();
          const fileRef = collection(
            db,
            `users/${uid}/objectives/${doc.id}/files/`
          );
          const files = await getDocs(fileRef);
          return {
            id: doc.id,
            ...objectiveData,
            files: files.docs.map((doc) => doc.data()),
          } as Objective;
        })
      );
      setObjectives(objectives);
      setLoading(false);
    };

    fetchObjectives();
  }, []);

  return { objectives, loading };
};

export default useFetchObjectives;
