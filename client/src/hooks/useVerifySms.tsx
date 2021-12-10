import { ASSIST_SERVER_URL } from '@env';
import axios from 'axios';
import React from 'react';

type verifySmsAuthProps = {
  phone: string;
  number: string;
};

export default function useVerifySms({ phone, number }: verifySmsAuthProps) {
  return () => axios.post(`${ASSIST_SERVER_URL}/user/smsauth/verify`, { phone, number });
}
