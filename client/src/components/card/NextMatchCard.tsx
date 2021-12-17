import React from 'react';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';
import CommonModalButton from '../button/CommonModalButton';
import ConfirmedMark from '../mark/ConfirmedMark';
import VotedMark from '../mark/VotedMark';
import GatheringMark from '../mark/GatheringMark';
import Card from './Card';
import { NextMatch } from '../../../@types/global/types';
import useMatchVote from '../../hooks/useMatchVote';
import { useNavigation } from '@react-navigation/native';

const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const SubtitleView = styled.View`
  justify-content: space-between;
  height: 103px;
  margin-bottom: 35px;
`;

type NextMatchCardProps = {
  conditions: '경기 확정' | '인원 모집 중' | '투표 완료';
  nextMatch: NextMatch;
  teamId: string | number;
};

export default function NextMatchCard({ teamId, conditions, nextMatch }: NextMatchCardProps) {
  const matchVote = useMatchVote();

  const getMark = () => {
    if (conditions === '경기 확정') {
      return <ConfirmedMark />;
    } else if (conditions === '인원 모집 중') {
      return <GatheringMark />;
    } else if (conditions === '투표 완료') {
      return <VotedMark />;
    }
  };

  const navigation = useNavigation<any>();

  const handleMatchVote = () => {
    navigation.navigate('MatchVote', { matchId: nextMatch?.id });
  };

  const getButton = () => {
    let text = '자세히 보기  >';
    let color: 'transparent' | 'blue' = 'transparent';
    let blueText = true;

    if (conditions === '인원 모집 중') {
      text = '투표하기 >';
      color = 'blue';
      blueText = false;
    }
    return (
      <CommonModalButton
        onPress={() => handleMatchVote()}
        text={text}
        color={color}
        blueText={blueText}
      />
    );
  };

  return (
    <Card>
      <TitleView>
        <Bold size={20}>🗓 다음 경기</Bold>
        {getMark()}
      </TitleView>
      <SubtitleView>
        <Regular size={17}>
          {nextMatch?.date} ({nextMatch?.day})
        </Regular>
        <Bold size={17}>
          시작 {nextMatch?.startTime} → {nextMatch?.endTime} 종료
        </Bold>
        <Regular gray>{nextMatch?.address}</Regular>
        <Regular gray>{nextMatch?.address2}</Regular>
      </SubtitleView>
      {getButton()}
    </Card>
  );
}
