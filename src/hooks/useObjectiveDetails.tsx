import { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs"; // Assuming dayjs is installed
import formatDate from "@/utils/formatDate";
import { IFile, Objective } from "@/utils/types";

type Option = {
  label: string;
  value: string;
  principal: boolean;
  finished: boolean;
};

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const useObjectiveDetails = (objectives: Objective[] | []) => {
  if (objectives.length === 0) {
    return {
      options: [],
      selectedObjective: null,
      showCompletationPopup: () => false,
      files: [],
      cardsToShow: [],
      handleValueChange: () => {},
      selectedValue: {
        label: "",
        value: "",
        principal: false,
        finished: false,
      },
    };
  }

  const options = useMemo<Option[]>(
    () =>
      objectives.map((item) => ({
        label: item.title,
        value: item.id,
        principal: item.principal,
        finished:
          item.completed ||
          dayjs().isAfter(dayjs(item.endingDate, "DD-MM-YYYY"), "D"),
      })),
    [objectives]
  );
  const [selectedValue, setSelectedValue] = useState(
    options.find((item) => item.principal === true) || options[0]
  );

  const selectedObjective = useMemo(
    () =>
      objectives.find((item) => item.id === selectedValue.value) ||
      objectives[0],
    [selectedValue, objectives]
  );

  const showCompletationPopup = () => {
    if (selectedObjective.viewed) return false;

    return (
      selectedObjective.completed ||
      dayjs().isAfter(dayjs(selectedObjective.endingDate, "DD-MM-YYYY"), "D")
    );
  };

  const files = useMemo(() => selectedObjective.files, [selectedObjective]);

  const nextPhotoDay = dayjs().diff(
    formatDate(selectedObjective.startingDate),
    "day"
  );

  const cardsToShow: IFile[] = useMemo(() => {
    const unlockedPhotos = Array.from({
      length: selectedObjective.totalDays - files.length,
    }).map((_, index) => ({
      unlocked: index + files.length === nextPhotoDay,
    }));

    const placeholderCount =
      selectedObjective.totalDays % 3 === 0
        ? 0
        : 3 - (selectedObjective.totalDays % 3);

    const placeholders = Array.from({ length: placeholderCount }).map(
      (_, index) => ({
        isPlaceholder: true,
      })
    );

    return [...files, ...unlockedPhotos, ...placeholders];
  }, [files, nextPhotoDay, selectedObjective.totalDays]);

  const handleValueChange = (value: Option) => {
    setSelectedValue(value);
  };

  return {
    options,
    selectedObjective,
    showCompletationPopup,
    files,
    cardsToShow,
    handleValueChange,
    selectedValue,
  };
};

export default useObjectiveDetails;
