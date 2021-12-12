export function getDate(day = 0) {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const returnDay = new Date(today.setDate(today.getDate() + day)).toISOString().slice(0, 10);

  return returnDay;
}
