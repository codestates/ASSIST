/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { KAKAO_JS_WEB_API_KEY } from '@env';
import { Platform } from 'react-native';

export default function initializeKakao() {
  if (Platform.OS === 'web') {
    window.Kakao.init(KAKAO_JS_WEB_API_KEY);
  }
}
