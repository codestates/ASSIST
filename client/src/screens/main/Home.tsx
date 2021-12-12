/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import CardScrollView from '../../components/view/CardScrollView';
import AddOnsCard from '../../components/card/AddOnsCard';
import AddTeamCard from '../../components/card/AddTeamCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import NextMatchCard from '../../components/card/NextMatchCard';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { RootState } from '../../store/reducers';
import { FirstTeam, NextMatch, TeamInfo } from '../../../@types/global/types';
import { getSelectedTeam } from '../../store/actions/userAction';

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, selectedTeam } = useSelector((state: RootState) => state.userReducer);
  const [nextMatch, setNextMatch] = useState<NextMatch>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
      if (selectedTeam.id < 0) {
        getFirstTeam().catch((error) => console.log(error));
      } else {
        getTeamInfo().catch((error) => console.log(error));
      }
    });
    return unsubscribe;
  }, [navigation, selectedTeam.id]);

  const getFirstTeam = async () => {
    try {
      const { data }: AxiosResponse<FirstTeam> = await axios.get(
        `${ASSIST_SERVER_URL}/user/firstteam`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      console.log('first : ', data);
      if (data.id >= 0) {
        const { id, name, leader } = data;
        dispatch(getSelectedTeam({ id, name, leader }));
        setNextMatch(data.nextMatch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamInfo = async () => {
    try {
      const { data }: AxiosResponse<TeamInfo> = await axios.get(
        `${ASSIST_SERVER_URL}/team/${selectedTeam.id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      console.log('change : ', data);
      setNextMatch(data.nextMatch);
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchCard = (nextMatch: NextMatch) => {
    if (selectedTeam.id < 0) {
      return <AddTeamCard />;
    } else {
      if (!nextMatch) {
        if (selectedTeam.leader) {
          return <NoMatchCard isLeader />;
        } else {
          return <NoMatchCard />;
        }
      } else {
        if (nextMatch.condition === '경기 확정') {
          return <NextMatchCard nextMatch={nextMatch} conditions="경기 확정" />;
        } else if (nextMatch.condition === '인원 모집 중') {
          if (nextMatch.vote) {
            return <NextMatchCard nextMatch={nextMatch} conditions="투표 완료" />;
          } else {
            return <NextMatchCard nextMatch={nextMatch} conditions="인원 모집 중" />;
          }
        }
      }
    }
  };

  return (
    <CardScrollView home>
      {getMatchCard(nextMatch)}
      <AddOnsCard />
    </CardScrollView>
  );
}
