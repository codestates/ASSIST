type getTextValuesProps = {
  text: string;
  type?: 'phone' | 'money' | 'timer' | 'password' | 'date';
};

export default function getTextValues({ text, type }: getTextValuesProps) {
  if (type === 'phone') {
    text = text.replace(/[^0-9]/g, '');
    let temp = '';
    if (text.length < 4) {
      return text;
    } else if (text.length < 8) {
      temp += text.substr(0, 3);
      temp += '-';
      temp += text.substr(3);
      return temp;
    } else {
      temp += text.substr(0, 3);
      temp += '-';
      temp += text.substr(3, 4);
      temp += '-';
      temp += text.substr(7);
      return temp;
    }
  } else if (type === 'money') {
    text = text.replace(/[^0-9]/g, '');
    let temp = '';
    if (text.length === 0) {
      return text;
    } else if (text === '00') {
      return '0원';
    } else if (text.length < 4) {
      return text + '원';
    } else if (text.length < 5) {
      temp += text.substr(0, 1);
      temp += ',';
      temp += text.substr(1);
      return temp + '원';
    } else if (text.length < 6) {
      temp += text.substr(0, 2);
      temp += ',';
      temp += text.substr(2);
      return temp + '원';
    } else if (text.length < 7) {
      temp += text.substr(0, 3);
      temp += ',';
      temp += text.substr(3);
      return temp + '원';
    } else {
      temp += text.substr(0, 3);
      temp += ',';
      temp += text.substr(3);
      temp += ',';
      temp += text.substr(3, 4);
      return temp + '원';
    }
  } else if (type === 'password') {
    text = text.replace(/\s/, '');
    return text;
  } else {
    return text;
  }
}
