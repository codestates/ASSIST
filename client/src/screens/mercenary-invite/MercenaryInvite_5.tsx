import React from 'react';
import styled from 'styled-components/native';

import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light, Regular } from '../../theme/fonts';
import useGoHome from '../../hooks/useGoHome';
import { addMercenaryMember } from '../../store/actions/propsAction';
import { useDispatch } from 'react-redux';

const Container = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export default function MercenaryInvite_5() {
  const dispatch = useDispatch();
  const goHome = useGoHome();
  const onPress = () => {
    dispatch(addMercenaryMember({ needNumber: 0, money: 0 }));
    goHome();
  };
  return (
    <FinishPageView buttonText="홈으로  >" onPress={onPress}>
      <Container>
        <Bold size={20}>
          용병 구인 신청이 완료 <Light size={20}>되었어요!</Light>
        </Bold>
        <Regular size={20}>1시간 뒤에 모집 결과를 알려드릴게요</Regular>
      </Container>
    </FinishPageView>
  );
}
