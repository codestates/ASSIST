export default function checkStartTime(date: string, startTime: string) {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const newDate = new Date();
  const utc = newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000;
  const koreaTime = new Date(utc + KR_TIME_DIFF);
  const currentTime = koreaTime.setSeconds(0, 0);

  const getStartTime = () => {
    const dateArr = date.split('-').map((el) => Number(el));
    const timeArr = startTime.split(':').map((el) => Number(el));
    const toMilliseconds = new Date(
      dateArr[0],
      dateArr[1] - 1,
      dateArr[2],
      timeArr[0],
      timeArr[1],
    ).getTime();

    return toMilliseconds;
  };

  if (currentTime > getStartTime()) {
    return false;
  }

  return true;
}
