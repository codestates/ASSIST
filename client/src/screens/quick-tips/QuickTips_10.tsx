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
import { Bold, Regular } from '../../theme/fonts';

export default function QuickTips_10() {
  const { layout, onLayout } = useOnLayout();
  const goToPrevious = useReset({ screenName: 'QuickTips_9' });
  const goToNext = useReset({ screenName: 'QuickTips_11' });

  return (
    <>
      <LoggedInHeader isTestTeam isTestLeader />
      <CardScrollView home>
        <NoMatchCard onLayout={onLayout} isLeader />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeNoMatchCard isLeader layout={layout} />
          <BubbleView
            layout={layout}
            title="다음 경기: ① 등록 전"
            description={
              <Regular>
                다음 경기 정보를 확인할 수 있어요.{'\n'}
                지금처럼 경기가 없을 땐, <Bold>[등록하기]</Bold>를 눌러 경기를 등록 할 수 있어요!
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
