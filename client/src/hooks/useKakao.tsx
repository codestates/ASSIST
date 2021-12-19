/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function useKakao() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      document.head.appendChild(script);
      console.log(window.Kakao);
      const script2 = document.createElement('script');
      const key = 'ae206f9a9481f59ed59f76ea86eb5305';
      script2.innerHTML = `Kakao.init(${key})`;
      document.head.appendChild(script2);
      console.log(document.head);
      // window.Kakao.init('ae206f9a9481f59ed59f76ea86eb5305');
      // script.async = true;
      // return () => {
      //   document.body.removeChild(script);
      // };
    }
  }, []);
}
