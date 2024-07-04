import { IFile } from "./types";

export const getBestStreak = (array: IFile[] | undefined) => {
  const allStreaks: number[] = [];

  if (!array) return 0;

  let streak = 0;

  array.map((item, i) => {
    if (!item.empty) {
      streak++;
      if (i === array.length - 1) {
        allStreaks.push(streak);
      }
    } else {
      allStreaks.push(streak);
      streak = 0;
    }
  });

  return Math.max(...allStreaks);
};
