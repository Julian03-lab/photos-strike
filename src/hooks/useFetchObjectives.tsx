import { useSession } from "@/context/ctx";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "root/config/firebase";

type Objective = {
  id: string;
  completed: boolean;
  createdAt: string;
  endingDate: string;
  notificationTime: string;
  notifications: boolean;
  principal: boolean;
  startingDate: string;
  title: string;
};

const useFetchObjectives = () => {
  const { session } = useSession();
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = session?.uid as string;
    const q = query(
      collection(db, `users/${uid}/objectives`),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setObjectives(
        snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { objectives, loading };
};

export default useFetchObjectives;
