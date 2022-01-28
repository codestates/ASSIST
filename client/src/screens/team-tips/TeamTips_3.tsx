import React, { useEffect } from 'react';
import AddOnsCard from '../../components/card/AddOnsCard';
import FakeNoMatchCard from '../../components/card/FakeNoMatchCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useFadeAnim from '../../hooks/useFadeAnim';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { Bold, Regular } from '../../theme/fonts';

export default function TeamTips_3() {
  const { layout, onLayout } = useOnLayout();
  const goToPrevious = useReset({ screenName: 'TeamTips_2' });
  const goToNext = useReset({ screenName: 'TeamTips_5' });
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnim({ duration: 200 });

  useEffect(() => {
    fadeIn();
  }, []);

  const onPressNext = () => {
    fadeOut();
    setTimeout(() => goToNext(), 200);
  };

  const onPressPrevious = () => {
    fadeOut();
    setTimeout(() => goToPrevious(), 200);
  };

  return (
    <>
      <LoggedInHeader />
      <CardScrollView home>
        <NoMatchCard onLayout={onLayout} isLeader />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeNoMatchCard fadeAnim={fadeAnim} isLeader layout={layout} />
          <BubbleView
            fadeAnim={fadeAnim}
            layout={layout}
            title="다음 경기: ① 등록 전"
            description={
              <Regular>
                다음 경기 정보를 확인할 수 있어요.{'\n'}
                지금처럼 경기가 없을 땐, <Bold>[등록하기]</Bold>를 눌러 경기를 등록 할 수 있어요!
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={onPressNext}
            onPressPrevious={onPressPrevious}
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
