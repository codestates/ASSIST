/* eslint-disable react-hooks/exhaustive-deps */
import { ASSIST_SERVER_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MatchInfo } from '../../@types/global/types';
import { RootState } from '../store/reducers';

export default function useMatchDetail(matchId: any) {
  const { token } = useSelector((state: RootState) => state.userReducer);
  const { id } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  const [data, setData] = useState<MatchInfo>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { matchId } = useSelector((state: RootState) => state.propsReducer);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data }: AxiosResponse<MatchInfo> = await axios.get(
          `${ASSIST_SERVER_URL}/match/${matchId}`,
          {
            headers: { authorization: `Bearer ${token}` },
          },
        );
        setData(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return { data, isLoading };
}
