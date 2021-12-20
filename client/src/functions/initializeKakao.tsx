/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { KAKAO_JS_WEB_API_KEY } from '@env';

export default function initializeKakao() {
  window.Kakao.init(KAKAO_JS_WEB_API_KEY);
}
