import type { Objective } from "@/utils/types";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
var customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

const formatTime = (hours: number, minutes: number) => {
  const hour = hours < 10 ? `0${hours}` : hours;
  const minute = minutes < 10 ? `0${minutes}` : minutes;
  return { hour, minute };
};

const useCalculateRemainingTime = (selectedObjective: Objective | null) => {
  const [textToShow, setTextToShow] = useState("");
  const [loadingText, setLoadingText] = useState(false);
  const [canTakePhoto, setCanTakePhoto] = useState(false);

  if (!selectedObjective) return { textToShow, loadingText };

  const calculateTimeToNextPhoto = () => {
    const nextPhotoDate = dayjs(
      selectedObjective.lastPhotoDate,
      "DD-MM-YYYY"
    ).add(1, "day");

    if (
      nextPhotoDate.isBefore(dayjs()) ||
      selectedObjective.lastPhotoDate === null
    ) {
      setTextToShow("Es momento de la foto de hoy");
      setCanTakePhoto(true);
    } else {
      const hours = nextPhotoDate.diff(dayjs(), "hour");
      const minutes = nextPhotoDate.diff(dayjs(), "minutes") % 60;
      const { hour, minute } = formatTime(hours, minutes);
      setTextToShow(`Faltan ${hour} HS ${minute} MIN para la foto del dia`);
      setCanTakePhoto(false);
    }
    setLoadingText(false);

    // const newTextToShow =
    //   nextPhotoDate.isBefore(dayjs()) ||
    //   selectedObjective.lastPhotoDate === null
    //     ? "Ya puedes tomar la foto de hoy"
    //     : `Faltan ${nextPhotoDate.diff(dayjs(), "hour")}:${
    //         nextPhotoDate.diff(dayjs(), "minutes") % 60
    //       } para la foto del dia`;

    // setTextToShow(newTextToShow);
  };

  useEffect(() => {
    if (selectedObjective.completed) return;
    setLoadingText(true);
    !textToShow && calculateTimeToNextPhoto();
    const intervalId = setInterval(() => {
      calculateTimeToNextPhoto();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedObjective]);

  return { textToShow, loadingText, canTakePhoto };
};

export default useCalculateRemainingTime;
