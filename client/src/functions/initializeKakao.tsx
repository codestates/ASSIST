/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { KAKAO_JS_WEB_API_KEY } from '@env';

export default function initializeKakao() {
  window.Kakao.init('ae206f9a9481f59ed59f76ea86eb5305');
}
