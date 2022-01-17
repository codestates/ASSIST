import React from 'react';
import FakeButton from '../../components/button/FakeButton';
import AddTeamCard from '../../components/card/AddTeamCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { Regular } from '../../theme/fonts';

export default function QuickTips_4() {
  const { layout, onLayout } = useOnLayout();
  const goToNext = useReset({ screenName: 'QuickTips_5' });
  const goToPrevious = useReset({ screenName: 'QuickTips_3' });

  return (
    <>
      <LoggedInHeader isTestSelect />
      <CardScrollView home>
        <AddTeamCard onLayout={onLayout} />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeButton layout={layout} text="팀 가입하기" color="white" />
          <BubbleView
            layout={layout}
            title="2.팀 가입하기"
            description={<Regular>어시스트에 등록된 팀에 가입할 수도 있어요.</Regular>}
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
