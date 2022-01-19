import React from 'react';
import { useSelector } from 'react-redux';
import AddTeamCard from '../../components/card/AddTeamCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useReset from '../../hooks/useReset';
import { RootState } from '../../store/reducers';
import { Regular } from '../../theme/fonts';

export default function QuickTips_2() {
  const { name } = useSelector((state: RootState) => state.userReducer);
  const goToNext = useReset({ screenName: 'QuickTips_3' });

  return (
    <>
      <LoggedInHeader isTestSelect />
      <CardScrollView home>
        <AddTeamCard />
      </CardScrollView>
      <ShadeView isNoLayout>
        <BubbleView
          isFirst
          isPointerDown
          nextBtnText="좋아요"
          title={`${name}님, 반가워요👋`}
          description={
            <Regular>
              어시스트에 오신 것을 환영합니다🎉🎉{'\n'}
              간단한 사용법을 알려드릴게요!
            </Regular>
          }
          onPressNext={goToNext}
          onPressPrevious={() => {}}
        />
      </ShadeView>
    </>
  );
}
