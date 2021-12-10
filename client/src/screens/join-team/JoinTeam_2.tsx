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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import axios from 'axios';
import { ASSIST_SERVER_URL } from '@env';

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
  const { name, code } = useSelector((state: RootState) => state.propsReducer.joinTeam);
  const { token } = useSelector((state: RootState) => state.userReducer);

  const joinTeam = () => {
    axios
      .post(
        `${ASSIST_SERVER_URL}/team/join`,
        { code },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        navigation.navigate('JoinTeam_3');
      })
      .catch((error) => console.log(error));
  };

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
            {name}
          </Bold>
        </TeamName>
      </NextPageView>
      <SkipButton
        text="제 소속팀이 아니에요  >"
        onPress={() => navigation.navigate('JoinTeam_1', { reset: true })}
      />
      <NextButton onPress={() => joinTeam()} />
    </>
  );
}
