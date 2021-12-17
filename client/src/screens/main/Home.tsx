/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import CardScrollView from '../../components/view/CardScrollView';
import AddOnsCard from '../../components/card/AddOnsCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import NextMatchCard from '../../components/card/NextMatchCard';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { RootState } from '../../store/reducers';
import { FirstTeam, NextMatch, TeamInfo } from '../../../@types/global/types';
import { getSelectedTeam } from '../../store/actions/userAction';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

type TeamProps = StackScreenProps<RootStackParamList, 'Team'>;

export default function Home({ route }: TeamProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { token, selectedTeam, id } = useSelector((state: RootState) => state.userReducer);
  const teamId = Number(route.params?.teamId);
  const [nextMatch, setNextMatch] = useState<NextMatch>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
      if (selectedTeam.id === -1) {
        getFirstTeam().catch((error) => console.log(error));
      } else if (selectedTeam.id > 0) {
        getTeamInfo(teamId).catch((error) => console.log(error));
      }
    });
    return unsubscribe;
  }, [navigation]);

  const getFirstTeam = async () => {
    const { data }: AxiosResponse<FirstTeam> = await axios.get(
      `${ASSIST_SERVER_URL}/user/firstteam`,
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );
    if (data.id === -1) {
      return navigation.replace('CreateOrJoin');
    } else {
      dispatch(getSelectedTeam({ id: data.id, name: data.name, leader: data.leader }));
      setNextMatch(data.nextMatch);
      return navigation.setParams({ teamId: String(data.id) });
    }
  };

  const getTeamInfo = async (teamId: number) => {
    const { data }: AxiosResponse<TeamInfo> = await axios.get(
      `${ASSIST_SERVER_URL}/team/${teamId}`,
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );
    const { name, leaderId } = data;
    dispatch(getSelectedTeam({ id: teamId, name, leader: leaderId === Number(id) }));
    setNextMatch(data.nextMatch);
  };

  const getMatchCard = (nextMatch: NextMatch) => {
    if (!nextMatch) {
      return <NoMatchCard isLeader={selectedTeam.leader} />;
    }
    let conditions: '인원 모집 중' | '경기 확정' | '투표 완료' = nextMatch.condition;
    if (nextMatch.condition === '인원 모집 중' && nextMatch.vote) {
      conditions = '투표 완료';
    }
    return <NextMatchCard nextMatch={nextMatch} conditions={conditions} />;
  };

  return (
    <CardScrollView home>
      {getMatchCard(nextMatch)}
      <AddOnsCard />
    </CardScrollView>
  );
}
