import { useSession } from "@/context/ctx";
import { useObjectivesStore } from "@/context/store";
import { Objective } from "@/utils/types";
import dayjs from "dayjs";
import { CameraCapturedPicture } from "expo-camera";
import { addDoc, collection, doc, writeBatch } from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { db } from "root/config/firebase";
var customParseFormat = require("dayjs/plugin/customParseFormat");

const useSubmitPhoto = (objectiveId: string) => {
  const { session } = useSession();
  const { objectives } = useObjectivesStore();
  const [loading, setLoading] = useState(false);

  const actualObjective = objectives.find(
    (objective) => objective.id === objectiveId
  ) as Objective;

  async function saveImage(
    image: CameraCapturedPicture,
    onSuccess?: () => void
  ) {
    try {
      setLoading(true);
      let base64Img = `data:image/jpg;base64,${image.base64}`;
      let apiUrl = "https:api.cloudinary.com/v1_1/dadt6ioi4/image/upload";
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
        createdAt: dayjs().toISOString(),
      };

      const filesRef = doc(
        collection(db, `users/${session?.uid}/objectives/${objectiveId}/files`)
      );

      dayjs.extend(customParseFormat);
      const today = dayjs();

      const emptyDays = actualObjective.lastPhotoDate
        ? today.diff(
            dayjs(actualObjective.lastPhotoDate, "DD-MM-YYYY"),
            "day"
          ) - 1
        : today.diff(dayjs(actualObjective.startingDate, "DD-MM-YYYY"), "day");

      const batch = writeBatch(db);

      const emptyDate =
        dayjs(actualObjective.lastPhotoDate, "DD-MM-YYYY")
          .add(1, "day")
          .format("DD-MM-YYYY") ||
        dayjs(actualObjective.startingDate, "DD-MM-YYYY");

      for (let i = 0; i < emptyDays; i++) {
        const emptyFile = {
          empty: true,
          createdAt: dayjs(emptyDate, "DD-MM-YYYY").add(i, "day").toISOString(),
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

      if (
        actualObjective.files.length + 1 + emptyDays >=
        actualObjective.totalDays
      ) {
        batch.update(
          doc(db, `users/${session?.uid}/objectives/${objectiveId}`),
          {
            completed: true,
          }
        );
      }

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
