export default function formatCount(value: string) {
  const number = Number(value);
  if (number >= 1000) {
    const formatedNumber = `${number / 1000}K`;
    return formatedNumber;
  } else {
    return number;
  }
}
