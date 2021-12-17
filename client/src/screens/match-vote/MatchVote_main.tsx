/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import useNextMatch from '../../hooks/useNextMatch';
import LoadingView from '../../components/view/LoadingView';
import useMatchDetail from '../../hooks/useMatchDetail';
import axios from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

export default function MatchVote_main({ route }: any) {
  const navigation = useNavigation<any>();
  const [isloading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.userReducer);

  const [data, setData] = useState();

  useEffect(() => {
    let test = async () => {
      if (route.params) {
        console.log('실행');
        const { data } = await axios.get(`${ASSIST_SERVER_URL}/match/${route.params.matchId}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setData(data);
        console.log(data);
      }
    };
    test();
  }, []);

  useEffect(() => {
    if (data) {
      getMatchVoteScreen(data);
    }
  }, [data]);

  const getMatchVoteScreen = (data: any) => {
    console.log('이곳데이터', data);
    if (data?.condition === '경기 확정') {
      navigation.replace('MatchVote_3', { data });
    }
    if (data?.condition === '인원 모집 중') {
      if (data?.vote) {
        // 투표 완료
        navigation.replace('MatchVote_2', { data });
      } else {
        // 인원 모집 중
        navigation.replace('MatchVote_1', { data });
      }
    }
    if (data === null) {
      // 경기 취소
      navigation.replace('MatchVote_4', { data });
    }
    return null;
  };

  return isloading ? <LoadingView /> : null;
}
