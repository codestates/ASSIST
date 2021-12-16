import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import useGoHome from '../../hooks/useGoHome';

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const TeamName = styled(Container)`
  background-color: ${colors.whiteSmoke};
  height: 60px;
  margin-top: 65px;
`;

export default function JoinTeam_6() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goHome = useGoHome();
  const { name } = useSelector((state: RootState) => state.propsReducer.joinTeam);
  return (
    <FinishPageView onPress={() => goHome()}>
      <Container>
        <Bold size={20}>팀 가입이 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </Container>
      <TeamName>
        <Bold gray size={17}>
          {name}
        </Bold>
      </TeamName>
    </FinishPageView>
  );
}
