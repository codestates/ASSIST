import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
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
  margin-bottom: 26px;
  color: ${colors.gray};
`;

const Seperator = styled.View`
  height: 16px;
`;

export default function AddTeamCard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Card>
      <TitleText>소속팀을 추가해주세요 🤔</TitleText>
      <SubtitleText>새 팀을 등록하거나, 등록된 팀에 가입 해 주세요.</SubtitleText>
      <CommonModalButton
        text="팀 등록하기  >"
        color="blue"
        onPress={() => navigation.navigate('CreateTeam')}
      />
      <Seperator />
      <CommonModalButton
        blueText
        color="transparent"
        text="팀 가입하기"
        onPress={() => navigation.navigate('JoinTeam')}
      />
    </Card>
  );
}
