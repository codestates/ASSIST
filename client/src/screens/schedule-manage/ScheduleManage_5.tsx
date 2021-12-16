import React from 'react';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';
import useGoHome from '../../hooks/useGoHome';

export default function ScheduleManage_5() {
  const goHome = useGoHome();
  return (
    <FinishPageView buttonText="투표 하러 가기" onPress={() => goHome()}>
      <>
        <Bold size={20}>일정 공지가 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
