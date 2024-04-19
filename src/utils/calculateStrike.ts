export const getStreak = (array: any[]) => {
  let streak = 0;
  let i = array.length - 1;

  while (i >= 0 && !array[i].empty) {
    i--;
    streak++;
  }
  return streak;
};
