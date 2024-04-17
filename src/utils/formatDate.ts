export default function formatDate(date: string) {
  return date.split("/").reverse().join("-");
}
