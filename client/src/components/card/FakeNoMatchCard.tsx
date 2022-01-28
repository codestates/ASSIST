import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { LayoutType } from '../../../@types/global/types';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import CommonModalButton from '../button/CommonModalButton';
import Card from './Card';

const TitleText = styled(Bold)`
  font-size: 18px;
  margin-bottom: 13px;
`;

const SubtitleText = styled(Regular)`
  font-size: 13px;
  margin-bottom: ${(props: FakeNoMatchCardProps) => (props.isLeader ? '26px' : '0px')};
  color: ${colors.gray};
`;

type FakeNoMatchCardProps = {
  isLeader?: boolean;
  layout?: LayoutType;
  fadeAnim?: Animated.Value;
};

export default function FakeNoMatchCard({ fadeAnim, isLeader, layout }: FakeNoMatchCardProps) {
  return (
    <Card fadeAnim={fadeAnim} layout={layout}>
      <TitleText>예정된 경기가 없어요 🤔</TitleText>
      <SubtitleText isLeader={isLeader}>
        {isLeader ? '지금 새로운 경기 일정을 등록 해 보세요!' : '새로운 경기가 생기면 알려드릴게요'}
      </SubtitleText>
      {isLeader && (
        <CommonModalButton text="등록하기  >" disabled isFake color="blue" onPress={() => {}} />
      )}
    </Card>
  );
}
