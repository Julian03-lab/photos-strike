import { useSession } from "@/context/ctx";
import { CameraCapturedPicture } from "expo-camera";
import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { db } from "root/config/firebase";

const useSubmitPhoto = () => {
  const { session } = useSession();
  const [loading, setLoading] = useState(false);

  async function saveImage(
    image: CameraCapturedPicture,
    objectiveId: string,
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
      //   console.log(file);
      //   console.log(file.secure_url);

      const imageToSave = {
        url: file.secure_url,
        createdAt: new Date().toISOString(),
      };

      await addDoc(
        collection(db, `users/${session?.uid}/objectives/${objectiveId}/files`),
        imageToSave
      );
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
