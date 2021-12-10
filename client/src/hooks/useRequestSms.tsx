import { ASSIST_SERVER_URL } from '@env';
import axios from 'axios';
import React from 'react';

type requestSmsAuthProps = {
  phone?: string;
};

export default function useRequestSms({ phone }: requestSmsAuthProps) {
  if (!phone) {
    console.error('phone number is possibly undefined');
  }
  return () => axios.post(`${ASSIST_SERVER_URL}/user/smsauth`, { phone });
}
