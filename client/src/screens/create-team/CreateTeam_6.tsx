import React from 'react';
import FinishPageView from '../../components/view/FinishPageView';
import useGoHome from '../../hooks/useGoHome';
import { Bold, Light } from '../../theme/fonts';

export default function CreateTeam_6() {
  const goHome = useGoHome();
  return (
    <FinishPageView onPress={() => goHome()}>
      <>
        <Bold size={20}>팀 생성이 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
