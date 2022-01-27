import React from 'react';
import AddOnsCard from '../../components/card/AddOnsCard';
import FakeNoMatchCard from '../../components/card/FakeNoMatchCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { Regular } from '../../theme/fonts';

export default function TeamTips_4() {
  const { layout, onLayout } = useOnLayout();
  const goToPrevious = useReset({ screenName: 'TeamTips_2' });
  const goToNext = useReset({ screenName: 'TeamTips_5' });

  return (
    <>
      <LoggedInHeader />
      <CardScrollView home>
        <NoMatchCard onLayout={onLayout} />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeNoMatchCard layout={layout} />
          <BubbleView
            layout={layout}
            title="다음 경기: ① 등록 전"
            description={
              <Regular>
                다음 경기 정보를 확인할 수 있어요!{'\n'}
                아쉽게도 지금은 등록된 다음 경기가 없네요.
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={goToNext}
            onPressPrevious={goToPrevious}
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
