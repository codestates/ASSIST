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
import axios, { AxiosError, AxiosResponse } from 'axios';
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
    const unsubscribe = navigation.addListener('focus', async () => {
      dispatch(clearAll());
      await getTeamInfo();
    });
    return unsubscribe;
  }, [navigation]);

  const getTeamInfo = async () => {
    if (teamId && teamId !== selectedTeam.id) {
      // 외부 URL로 접속 시
      await getSelectedTeamInfo(teamId);
    } else {
      // 내부로 접속 시
      if (selectedTeam.id === -1) {
        // 로그인 시
        await getFirstTeam();
      } else {
        // 로그인 정보가 저장되어 있을 시
        if (teamId !== selectedTeam.id) {
          await getSelectedTeamInfo(selectedTeam.id);
        }
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
        dispatch(getSelectedTeam({ id: data.id, name: data.name, leader: data.leader }));
        setNextMatch(data.nextMatch);
        return navigation.replace('Team', { teamId: String(data.id) });
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
        return navigation.replace('Team', { teamId: String(teamId) });
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        await getFirstTeam();
      } else {
        console.log(err);
      }
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
