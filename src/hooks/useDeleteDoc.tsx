import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { auth } from "root/config/firebase";

const useDeleteDoc = (): [(documentId: string) => Promise<void>, boolean] => {
  const { removeObjective } = useObjectivesStore();

  const [loading, setLoading] = useState(false);

  const handleDelete = async (documentId: string) => {
    try {
      setLoading(true);

      const idToken = await auth.currentUser?.getIdToken();

      const response = await fetch(
        `http://192.168.100.8:3000/api/objectives/${documentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el objetivo");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error("Error al eliminar el objetivo");
      }

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
