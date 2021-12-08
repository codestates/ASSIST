import { ASSIST_SERVER_URL } from '@env';
import axios from 'axios';
import React from 'react';

type verifySmsAuthProps = {
  phone: string;
  number: string;
};

export default async function verifySmsAuth({ phone, number }: verifySmsAuthProps) {
  const response = await axios.post(`${ASSIST_SERVER_URL}/user/smsauth/verify`, { phone, number });
  return response;
}
