import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import AddOnsCard from '../../components/card/AddOnsCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import CardScrollView from '../../components/view/CardScrollView';
import useReset from '../../hooks/useReset';

const AvoidTouch = styled.View`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  position: absolute;
`;

export default function QuickTips_8() {
  const goToNext = useReset({ screenName: 'QuickTips_9' });

  useEffect(() => {
    setTimeout(() => goToNext(), 1500);
  });

  return (
    <>
      <LoggedInHeader isTestTeam isTestLeader />
      <CardScrollView home>
        <NoMatchCard isLeader />
        <AddOnsCard />
      </CardScrollView>
      <AvoidTouch />
    </>
  );
}
