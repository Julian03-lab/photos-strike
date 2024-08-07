import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { Objective } from "@/utils/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "root/config/firebase";

const useFetchObjectives = () => {
  const { session } = useSession();
  const { objectives, setObjectives } = useObjectivesStore();
  const [loading, setLoading] = useState(false);

  const uid = session?.uid as string;

  const fetchObjectives = async () => {
    try {
      setLoading(true);
      const queryObjectives = query(
        collection(db, `users/${uid}/objectives`),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(queryObjectives);

      if (snapshot.empty) {
        setObjectives([]);
        setLoading(false);
        return;
      }

      const objectives = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const queryFiles = query(
            collection(db, `users/${uid}/objectives/${doc.id}/files/`),
            orderBy("createdAt", "asc")
          );
          const objectiveData = doc.data();
          const fileRef = queryFiles;
          const files = await getDocs(fileRef);
          return {
            id: doc.id,
            ...objectiveData,
            files: files.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            }),
          } as Objective;
        })
      );
      setObjectives(objectives);
      setLoading(false);
    } catch (error) {
      setObjectives([]);
      console.log("Error fetching objectives", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, []);

  return { objectives, loading, fetchObjectives };
};

export default useFetchObjectives;
