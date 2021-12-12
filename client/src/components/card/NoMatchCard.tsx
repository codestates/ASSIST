import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import CommonModalButton from '../button/CommonModalButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Card from './Card';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TitleText = styled(Bold)`
  font-size: 18px;
  margin-bottom: 13px;
`;

const SubtitleText = styled(Regular)`
  font-size: 13px;
  margin-bottom: ${(props: NoMatchCardProps) => (props.isLeader ? '26px' : '0px')};
  color: ${colors.gray};
`;

type NoMatchCardProps = {
  isLeader?: boolean;
};

export default function NoMatchCard({ isLeader }: NoMatchCardProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Card>
      <TitleText>예정된 경기가 없어요 🤔</TitleText>
      <SubtitleText isLeader={isLeader}>
        {isLeader ? '지금 새로운 경기 일정을 등록 해 보세요!' : '새로운 경기가 생기면 알려드릴게요'}
      </SubtitleText>
      {isLeader && (
        <CommonModalButton
          text="등록하기  >"
          color="blue"
          onPress={() => navigation.navigate('ScheduleManage')}
        />
      )}
    </Card>
  );
}
