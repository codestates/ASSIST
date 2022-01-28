import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddTeamCard from '../../components/card/AddTeamCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useFadeAnim from '../../hooks/useFadeAnim';
import useReset from '../../hooks/useReset';
import { RootState } from '../../store/reducers';
import { Regular } from '../../theme/fonts';

export default function QuickTips_2() {
  const { name } = useSelector((state: RootState) => state.userReducer);
  const goToNext = useReset({ screenName: 'QuickTips_3' });
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnim({ duration: 200 });

  useEffect(() => {
    fadeIn();
  }, []);

  const onPressNext = () => {
    fadeOut();
    setTimeout(() => goToNext(), 200);
  };

  return (
    <>
      <LoggedInHeader isNewTeam />
      <CardScrollView home>
        <AddTeamCard />
      </CardScrollView>
      <ShadeView isNoLayout>
        <BubbleView
          fadeAnim={fadeAnim}
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
          onPressNext={onPressNext}
          onPressPrevious={() => {}}
        />
      </ShadeView>
    </>
  );
}
