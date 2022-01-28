import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import FakeTeamSelector from '../../components/button/FakeTeamSelector';
import Menu from '../../components/button/Menu';
import AddOnsCard from '../../components/card/AddOnsCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import HeaderContainer from '../../components/header/HeaderContainer';
import TopContainer from '../../components/header/TopContainer';
import BubbleView from '../../components/view/BubbleView';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useFadeAnim from '../../hooks/useFadeAnim';
import useOnLayout from '../../hooks/useOnLayout';
import useReset from '../../hooks/useReset';
import { RootState } from '../../store/reducers';
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

export default function TeamTips_2() {
  const { layout, onLayout } = useOnLayout();
  const goLeaderScreen = useReset({ screenName: 'TeamTips_3' });
  const goFollowerScreen = useReset({ screenName: 'TeamTips_4' });
  const { leader: isLeader, name } = useSelector(
    (state: RootState) => state.userReducer.selectedTeam,
  );
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnim({ duration: 200 });

  useEffect(() => {
    fadeIn();
  }, []);

  const goToNext = () => {
    if (isLeader) {
      goLeaderScreen();
    } else {
      goFollowerScreen();
    }
  };

  const onPressNext = () => {
    fadeOut();
    setTimeout(() => goToNext(), 200);
  };

  return (
    <>
      <HeaderContainer>
        <TopContainer>
          <Menu />
        </TopContainer>
        <BottomContainer>
          <TeamSelector onLayout={onLayout}>
            <TeamName>{name}</TeamName>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.blue} />
          </TeamSelector>
          <TeamSelector>
            <TeamName style={{ color: colors.lightGray }}>용병활동</TeamName>
          </TeamSelector>
        </BottomContainer>
      </HeaderContainer>
      <CardScrollView home>
        <NoMatchCard isLeader={isLeader} />
        <AddOnsCard />
      </CardScrollView>
      {layout ? (
        <ShadeView>
          <FakeTeamSelector fadeAnim={fadeAnim} teamName={name} layout={layout} />
          <BubbleView
            fadeAnim={fadeAnim}
            isFirst
            layout={layout}
            title="팀 선택"
            description={
              <Regular>
                팀 이름을 누르면, 소속된 다른 팀으로 이동할 수 있어요. 새로운 팀을 등록하거나 가입할
                수도 있구요!
              </Regular>
            }
            pointerLeftVal={25}
            onPressNext={onPressNext}
            onPressPrevious={() => {}}
          />
        </ShadeView>
      ) : (
        <ShadeView />
      )}
    </>
  );
}
