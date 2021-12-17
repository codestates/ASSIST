/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { addMatchId, clearAll } from '../../store/actions/propsAction';
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
import { StackNavigationProp } from '@react-navigation/stack';

export default function Home({ route }: any) {
  const dispatch = useDispatch();

  const teamId = Number(route.params?.teamId);
  const navigation = useNavigation<any>();
  const { token, selectedTeam, id } = useSelector((state: RootState) => state.userReducer);
  const [nextMatch, setNextMatch] = useState<NextMatch>(null);

  useEffect(() => {
    if (!token) {
      navigation.navigate('Guest');
    }
    console.log(navigation.getState());
  }, []);

  useEffect(() => {
    const check = async () => {
      try {
        await getTeamInfo(teamId);
      } catch (err: any) {
        await handleReplace();
      }
    };
    check();
  }, []);

  const handleReplace = async () => {
    const { data }: AxiosResponse<any> = await axios.get(`${ASSIST_SERVER_URL}/user/team`, {
      headers: { authorization: `Bearer ${token}` },
    });

    if (!data.length) {
      dispatch(getSelectedTeam({ id: -2, name: '', leader: false }));
      return navigation.replace('CreateTeam');
    } else {
      let selectId = selectedTeam.id > 0 ? selectedTeam.id : data[0].id;
      return navigation.replace('Team', { teamId: selectId });
    }
  };

  const getTeamInfo = async (teamId: number) => {
    try {
      const { data }: AxiosResponse<TeamInfo> = await axios.get(
        `${ASSIST_SERVER_URL}/team/${teamId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      const { name, leaderId } = data;
      dispatch(getSelectedTeam({ id: teamId, name, leader: leaderId === Number(id) }));
      setNextMatch(data.nextMatch);
    } catch (error) {
      throw error;
    }
  };

  const getMatchCard = (nextMatch: NextMatch) => {
    if (selectedTeam.id < 0) {
      return <AddTeamCard />;
    }
    if (!nextMatch) {
      return <NoMatchCard isLeader={selectedTeam.leader} />;
    }
    let conditions: '인원 모집 중' | '경기 확정' | '투표 완료' = nextMatch.condition;
    if (nextMatch.condition === '인원 모집 중' && nextMatch.vote) {
      conditions = '투표 완료';
    }
    return <NextMatchCard teamId={selectedTeam.id} nextMatch={nextMatch} conditions={conditions} />;
  };

  return (
    <CardScrollView home>
      {getMatchCard(nextMatch)}
      <AddOnsCard />
    </CardScrollView>
  );
}
