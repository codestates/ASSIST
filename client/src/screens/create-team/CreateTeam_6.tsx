import React from 'react';
import { useSelector } from 'react-redux';
import FinishPageView from '../../components/view/FinishPageView';
import useGoHome from '../../hooks/useGoHome';
import useReset from '../../hooks/useReset';
import { RootState } from '../../store/reducers';
import { Bold, Light } from '../../theme/fonts';

export default function CreateTeam_6() {
  const goHome = useGoHome();
  const goTeamTips = useReset({ screenName: 'TeamTips' });
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
      <>
        <Bold size={20}>팀 생성이 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
