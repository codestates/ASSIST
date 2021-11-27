import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import SkipButton from '../../components/button/SkipButton';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const TeamName = styled.View`
  width: 100%;
  background-color: ${colors.whiteSmoke};
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-top: 65px;
`;

export default function JoinTeam_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>팀 이름</Bold>
            <Light size={22}>을</Light>
          </>
          <Light size={22}>확인해 주세요 👀</Light>
        </MainTitle>
        <TeamName>
          <Bold gray size={17}>
            FC살쾡이
          </Bold>
        </TeamName>
      </NextPageView>
      <SkipButton
        text="제 소속팀이 아니에요  >"
        onPress={() => navigation.navigate('JoinTeam_1', { reset: true })}
      />
      <NextButton onPress={() => navigation.navigate('JoinTeam_3')} />
    </>
  );
}
