export default function checkOverMidnight(startTime?: string, endTime?: string) {
  if (!startTime || !endTime) {
    return false;
  }
  const startHour = parseInt(startTime.split(':')[0]);
  const startMinute = parseInt(startTime.split(':')[1]);
  const endHour = parseInt(endTime.split(':')[0]);
  const endMinute = parseInt(endTime.split(':')[1]);
  if (endHour < startHour) {
    return true;
  } else if (endHour === startHour) {
    if (endMinute < startMinute) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
