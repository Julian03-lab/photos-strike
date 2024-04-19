import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import dayjs from "dayjs";
import { CameraCapturedPicture } from "expo-camera";
import { router } from "expo-router";
import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { db } from "root/config/firebase";

const useSubmitPhoto = (objectiveId: string) => {
  const { session } = useSession();
  const { objectives } = useObjectivesStore();
  const [loading, setLoading] = useState(false);

  const actualObjective = objectives.find(
    (objective) => objective.id === objectiveId
  );

  async function saveImage(
    image: CameraCapturedPicture,
    onSuccess?: () => void
  ) {
    try {
      setLoading(true);
      console.log("save image");
      let base64Img = `data:image/jpg;base64,${image.base64}`;
      let apiUrl = "https://api.cloudinary.com/v1_1/dadt6ioi4/image/upload";
      let data = {
        file: base64Img,
        upload_preset: "azigrdxg",
      };

      const response = await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const file = await response.json();

      const imageToSave = {
        url: file.secure_url,
        createdAt: new Date().toISOString(),
      };

      const batch = writeBatch(db);

      const filesRef = doc(
        collection(db, `users/${session?.uid}/objectives/${objectiveId}/files`)
      );

      const emptyDays = actualObjective?.lastPhotoDate
        ? dayjs().diff(dayjs(actualObjective?.lastPhotoDate), "day") - 1
        : 0;

      for (let i = 0; i < emptyDays; i++) {
        const emptyFile = {
          empty: true,
        };

        batch.set(
          doc(
            collection(
              db,
              `users/${session?.uid}/objectives/${objectiveId}/files`
            )
          ),
          emptyFile
        );
      }

      batch.set(filesRef, imageToSave);
      batch.update(doc(db, `users/${session?.uid}/objectives/${objectiveId}`), {
        lastPhotoDate: dayjs().format("DD-MM-YYYY"),
      });

      await batch.commit();

      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Error al guardar la imagen",
        text2: "Intenta de nuevo",
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  }

  return { saveImage, loading };
};

export default useSubmitPhoto;
