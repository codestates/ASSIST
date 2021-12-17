/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LoadingView from '../../components/view/LoadingView';
import useMatchDetail from '../../hooks/useMatchDetail';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { MatchInfo } from '../../../@types/global/types';

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_Main'>;

export default function MatchVote_Main({ route }: MatchVoteProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isLoading, data } = useMatchDetail({ matchId: route.params?.matchId });

  useEffect(() => {
    if (!isLoading) {
      getMatchVoteScreen(data);
    }
  }, [isLoading]);

  const getMatchVoteScreen = (data: MatchInfo) => {
    if (data?.condition === '경기 확정') {
      // 경기 확정
      navigation.replace('MatchVote_3', { data });
    } else if (data?.condition === '인원 모집 중') {
      if (data?.vote) {
        // 투표 완료
        navigation.replace('MatchVote_2', { data });
      } else {
        // 인원 모집 중
        navigation.replace('MatchVote_1', { data });
      }
    } else if (data?.condition === '경기 취소') {
      // 경기 취소
      navigation.replace('MatchVote_4', { data });
    }
    return null;
  };

  return <LoadingView />;
}
