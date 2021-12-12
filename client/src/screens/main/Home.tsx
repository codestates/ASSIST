/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import CardScrollView from '../../components/view/CardScrollView';
import Card from '../../components/card/Card';
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
    if (selectedTeam.id < 0) {
      getFirstTeam().catch((error) => console.log(error));
    } else {
      getTeamInfo().catch((error) => console.log(error));
    }
  }, [selectedTeam.id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
    });
    return unsubscribe;
  }, [navigation]);

  const getFirstTeam = async () => {
    try {
      const { data }: AxiosResponse<FirstTeam> = await axios.get(
        `${ASSIST_SERVER_URL}/user/firstteam`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
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
      setNextMatch(data.nextMatch);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardScrollView home>
      <Card>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTeam')}>
          <Text>{nextMatch?.condition}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('JoinTeam')}>
          <Text>팀 가입하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LendingPage')}>
          <Text>랜딩 페이지</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ScheduleManage')}>
          <Text>일정 관리</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MatchVote')}>
          <Text>인원 모집 중</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MercenaryInvite')}>
          <Text>용병 구하기</Text>
        </TouchableOpacity>
      </Card>
      <NextMatchCard conditions="경기 확정" />
      <NextMatchCard conditions="투표 완료" />
      <NextMatchCard conditions="인원 모집 중" />
      <NoMatchCard />
      <AddTeamCard />
      <AddOnsCard />
    </CardScrollView>
  );
}
