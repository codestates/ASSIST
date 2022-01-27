import React from 'react';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import useGoHome from '../../hooks/useGoHome';
import useReset from '../../hooks/useReset';

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

export default function JoinTeam_3() {
  const goHome = useGoHome();
  const goTeamTips = useReset({ screenName: 'TeamTips' });
  const { name } = useSelector((state: RootState) => state.propsReducer.joinTeam);
  const { role } = useSelector((state: RootState) => state.userReducer);

  const getNavigation = () => {
    if (role === 'tips2') {
      goTeamTips();
    } else {
      goHome();
    }
  };

  return (
    <FinishPageView onPress={() => getNavigation()}>
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
