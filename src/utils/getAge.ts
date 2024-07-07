import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");

dayjs.extend(customParseFormat);

export function getAge(birthday: string | undefined) {
  const age = dayjs().diff(dayjs(birthday, "DD-MM-YYYY"), "year");
  return age;
}
