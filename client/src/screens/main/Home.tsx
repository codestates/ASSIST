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
import { Platform } from 'react-native';

type TeamProps = StackScreenProps<RootStackParamList, 'Team'>;

export default function Home({ route }: TeamProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { token, selectedTeam, id } = useSelector((state: RootState) => state.userReducer);
  const routeTeamId = Number(route.params?.teamId);
  const [nextMatch, setNextMatch] = useState<NextMatch>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(clearAll());
      await getTeamInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const getTeamInfo = async () => {
    if (routeTeamId && routeTeamId !== selectedTeam.id) {
      // 외부 URL로 접속 시
      await getSelectedTeamInfo(routeTeamId);
    } else {
      // 내부로 접속 시
      if (selectedTeam.id === -1) {
        // 로그인 시
        await getFirstTeam();
      } else {
        // 로그인 정보가 저장되어 있을 시
        await getSelectedTeamInfo(selectedTeam.id);
      }
    }
  };

  const getFirstTeam = async () => {
    try {
      const { data }: AxiosResponse<FirstTeam> = await axios.get(
        `${ASSIST_SERVER_URL}/user/firstteam`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      if (data.id === -1) {
        return navigation.replace('CreateOrJoin');
      } else {
        dispatch(
          getSelectedTeam({
            id: data.id,
            name: data.name,
            leader: data.leader,
          }),
        );
        setNextMatch(data.nextMatch);
        if (Platform.OS === 'web') {
          window.history.replaceState(null, 'ASSIST', String(data.id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedTeamInfo = async (teamId: number) => {
    try {
      const { data }: AxiosResponse<TeamInfo> = await axios.get(
        `${ASSIST_SERVER_URL}/team/${teamId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      if (data) {
        dispatch(
          getSelectedTeam({ id: teamId, name: data.name, leader: data.leaderId === Number(id) }),
        );
        setNextMatch(data.nextMatch);
        if (Platform.OS === 'web') {
          window.history.replaceState(null, 'ASSIST', String(teamId));
        }
      }
    } catch (error) {
      console.log(error);
    }
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
