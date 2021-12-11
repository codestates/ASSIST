import React from 'react';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';
import CommonModalButton from '../button/CommonModalButton';
import ConfirmedMark from '../mark/ConfirmedMark';
import VotedMark from '../mark/VotedMark';
import GatheringMark from '../mark/GatheringMark';
import Card from './Card';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;
`;

const SubtitleView = styled.View`
  justify-content: space-between;
  height: 70px;
  margin-bottom: 35px;
`;

type NextMatchCardProps = {
  conditions: '경기 확정' | '인원 모집 중' | '투표 완료';
};

export default function NextMatchCard({ conditions }: NextMatchCardProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const getMark = () => {
    if (conditions === '경기 확정') {
      return <ConfirmedMark />;
    } else if (conditions === '인원 모집 중') {
      return <GatheringMark />;
    } else if (conditions === '투표 완료') {
      return <VotedMark />;
    }
  };

  const getButton = () => {
    if (conditions === '경기 확정' || conditions === '투표 완료') {
      return <CommonModalButton text="자세히 보기  >" color="transparent" blueText />;
    } else if (conditions === '인원 모집 중') {
      return (
        <CommonModalButton
          onPress={() => navigation.navigate('MatchVote')}
          text="투표하기 >"
          color="blue"
        />
      );
    }
  };

  return (
    <Card>
      <TitleView>
        <Bold size={19}>🗓 다음 경기</Bold>
        {getMark()}
      </TitleView>
      <SubtitleView>
        <Regular size={17}>2021-08-18 (수)</Regular>
        <Bold size={17}>시작 18:00 → 20:00 종료</Bold>
        <Regular size={14} gray>
          서울특별시 용산구 용산대로 12번길 3, 4층
        </Regular>
      </SubtitleView>
      {getButton()}
    </Card>
  );
}
