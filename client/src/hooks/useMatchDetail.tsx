/* eslint-disable react-hooks/exhaustive-deps */
import { ASSIST_SERVER_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MatchInfo } from '../../@types/global/types';
import { RootState } from '../store/reducers';
import useNestedReset from './useNestedReset';

type useMatchDetailProps = {
  matchId?: number;
};

export default function useMatchDetail({ matchId }: useMatchDetailProps) {
  const { token } = useSelector((state: RootState) => state.userReducer);
  const [data, setData] = useState<MatchInfo>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const resetLogin = useNestedReset({
    routes: [{ name: 'Guest', state: { routes: [{ name: 'GetStarted' }] } }],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data }: AxiosResponse<MatchInfo> = await axios.get(
          `${ASSIST_SERVER_URL}/match/${matchId || -1}`,
          {
            headers: { authorization: `Bearer ${token}` },
          },
        );
        setData(data);
      } catch (error) {
        const err = error as AxiosResponse;
        if (err.status === 401) {
          resetLogin();
        }
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return { data, isLoading };
}
