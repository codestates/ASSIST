export default function getDayString(date: string) {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const year = Number(date.split('-')[0]);
  const month = Number(date.split('-')[1]);
  const day = Number(date.split('-')[2]);
  const newDate = new Date(year, month - 1, day);
  return dayNames[newDate.getDay()];
}
