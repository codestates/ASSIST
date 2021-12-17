import { ASSIST_SERVER_URL } from '@env';
import axios from 'axios';

type requestSmsAuthProps = {
  phone?: string;
};

export default function useRequestSms({ phone }: requestSmsAuthProps) {
  return () => axios.post(`${ASSIST_SERVER_URL}/user/smsauth`, { phone });
}
