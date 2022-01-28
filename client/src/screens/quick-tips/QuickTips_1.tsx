import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import AddTeamCard from '../../components/card/AddTeamCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useFadeAnim from '../../hooks/useFadeAnim';
import useReset from '../../hooks/useReset';

const AvoidTouch = styled.View`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  position: absolute;
`;

export default function QuickTips_1() {
  const goToNext = useReset({ screenName: 'QuickTips_2' });
  const { fadeAnim, fadeIn } = useFadeAnim({ duration: 1000 });

  useEffect(() => {
    fadeIn();
    setTimeout(() => goToNext(), 1000);
  }, []);

  return (
    <>
      <LoggedInHeader isNewTeam />
      <CardScrollView home>
        <AddTeamCard />
      </CardScrollView>
      <ShadeView fadeAnim={fadeAnim} />
      <AvoidTouch />
    </>
  );
}
