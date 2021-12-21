export default function getHangleDate(date = new Date().toISOString()) {
  date = new Date(date).toISOString();
  const dayArr = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const day = dayArr[new Date().getDay()] + '요일';

  const _year = date.substr(0, 4);

  const _month = date.substr(5, 2);

  const _day = date.substr(8, 2);

  return _year + '년' + ' ' + _month + '월' + ' ' + _day + '일' + ' ' + day;
}
