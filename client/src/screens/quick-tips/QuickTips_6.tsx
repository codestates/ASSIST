import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import FakeTeamSelector from '../../components/button/FakeTeamSelector';
import Menu from '../../components/button/Menu';
import AddTeamCard from '../../components/card/AddTeamCard';
import HeaderContainer from '../../components/header/HeaderContainer';
import TopContainer from '../../components/header/TopContainer';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useFadeAnim from '../../hooks/useFadeAnim';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const BottomContainer = styled.View`
  flex-direction: row;
  padding: 0px 20px;
  margin-bottom: 10px;
  height: 30px;
`;

const TeamSelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
`;

const TeamName = styled(Bold)`
  color: ${colors.blue};
  font-size: 17px;
  margin-right: 2px;
`;

export default function QuickTips_6() {
  const { layout, onLayout } = useOnLayout();
  const goToNext = useReset({ screenName: 'QuickTips_7' });
  const goToPrevious = useReset({ screenName: 'QuickTips_5' });
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
      <HeaderContainer>
        <TopContainer>
          <Menu />
        </TopContainer>
        <BottomContainer>
          <TeamSelector>
            <TeamName>팀 선택</TeamName>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.blue} />
          </TeamSelector>
          <TeamSelector onLayout={onLayout}>
            <TeamName style={{ color: colors.lightGray }}>용병활동</TeamName>
          </TeamSelector>
        </BottomContainer>
      </HeaderContainer>
      <CardScrollView home>
        <AddTeamCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeTeamSelector fadeAnim={fadeAnim} layout={layout} />
          <BubbleView
            fadeAnim={fadeAnim}
            layout={layout}
            title="4.용병활동"
            description={
              <Regular>
                <Bold>다른 팀 경기에 초대를 받고, 용병으로 참여</Bold> 할 수도 있어요.{' '}
                <Regular red>(이 기능은 아직 준비중입니다.)</Regular>
              </Regular>
            }
            pointerLeftVal={14}
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
