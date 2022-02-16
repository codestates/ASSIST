import React from 'react';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStackParamList';

type ScheduleManageProps = StackScreenProps<RootStackParamList, 'ScheduleManage_5'>;

export default function ScheduleManage_5({ route, navigation }: ScheduleManageProps) {
  return (
    <FinishPageView
      buttonText="참석 현황 보기"
      onPress={() => navigation.navigate('MatchVote', { matchId: Number(route.params.matchId) })}>
      <>
        <Bold size={20}>일정 공지가 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
