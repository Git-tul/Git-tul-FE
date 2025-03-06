export default function formatCount(value: string) {
  const number = Number(value);
  if (number >= 1000) {
    return `${number / 1000}K`;
  } else {
    return number;
  }
}
