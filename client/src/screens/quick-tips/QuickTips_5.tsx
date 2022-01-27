import React from 'react';
import FakeMenu from '../../components/button/FakeMenu';
import Menu from '../../components/button/Menu';
import AddTeamCard from '../../components/card/AddTeamCard';
import BottomContainer from '../../components/header/BottomContainer';
import HeaderContainer from '../../components/header/HeaderContainer';
import TopContainer from '../../components/header/TopContainer';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { Regular } from '../../theme/fonts';

export default function QuickTips_5() {
  const { layout, onLayout } = useOnLayout();
  const goToNext = useReset({ screenName: 'QuickTips_6' });
  const goToPrevious = useReset({ screenName: 'QuickTips_4' });

  return (
    <>
      <HeaderContainer>
        <TopContainer>
          <Menu onLayout={onLayout} />
        </TopContainer>
        <BottomContainer isNewTeam />
      </HeaderContainer>
      <CardScrollView home>
        <AddTeamCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeMenu layout={layout} />
          <BubbleView
            layout={layout}
            title="3.내 정보"
            description={<Regular>내 정보를 확인하고 수정할 수 있어요!</Regular>}
            pointerLeftVal={-15}
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
