/* eslint-disable react-hooks/exhaustive-deps */
import { ASSIST_SERVER_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NextMatch, TeamInfo } from '../../@types/global/types';
import { RootState } from '../store/reducers';

type useNextMatchProps = {
  teamId?: number;
};

export default function useNextMatch({ teamId }: useNextMatchProps) {
  const { token } = useSelector((state: RootState) => state.userReducer);
  const [data, setData] = useState<NextMatch>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const {
          data: { nextMatch },
        }: AxiosResponse<TeamInfo> = await axios.get(`${ASSIST_SERVER_URL}/team/${teamId || -1}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setData(nextMatch);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return { data, isLoading };
}
