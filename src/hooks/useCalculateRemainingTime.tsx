import type { Objective } from "@/utils/types";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
var customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

const formatTime = (hours: number, minutes: number) => {
  const hour = hours < 10 ? `0${hours}` : hours;
  const minute = minutes < 10 ? `0${minutes}` : minutes;
  return `${hour}:${minute}`;
};

const useCalculateRemainingTime = (selectedObjective: Objective) => {
  const [textToShow, setTextToShow] = useState("");
  const [loadingText, setLoadingText] = useState(false);

  const calculateTimeToNextPhoto = () => {
    const nextPhotoDate = dayjs(
      selectedObjective.lastPhotoDate,
      "DD-MM-YYYY"
    ).add(1, "day");

    if (
      nextPhotoDate.isBefore(dayjs()) ||
      selectedObjective.lastPhotoDate === null
    ) {
      setTextToShow("Es momento de la foto de hoy📷");
    } else {
      const hours = nextPhotoDate.diff(dayjs(), "hour");
      const minutes = nextPhotoDate.diff(dayjs(), "minutes") % 60;
      setTextToShow(
        `Faltan ${formatTime(hours, minutes)} para la foto del dia`
      );
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

  return { textToShow, loadingText };
};

export default useCalculateRemainingTime;
