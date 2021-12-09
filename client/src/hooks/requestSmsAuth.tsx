import { ASSIST_SERVER_URL } from '@env';
import axios from 'axios';
import React from 'react';

type requestSmsAuthProps = {
  phone?: string;
};

export default async function requestSmsAuth({ phone }: requestSmsAuthProps) {
  if (!phone) {
    return console.error('phone number is possibly undefined');
  }
  const response = await axios.post(`${ASSIST_SERVER_URL}/user/smsauth`, { phone });
  return response;
}
