export default function toNumber(value: unknown) {
  return Number(String(value).match(/\d+/g)?.join(''));
}
