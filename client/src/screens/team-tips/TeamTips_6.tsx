import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import AddOnsCard from '../../components/card/AddOnsCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import LoggedInHeader from '../../components/header/LoggedInHeader';
import CardScrollView from '../../components/view/CardScrollView';
import ShadeView from '../../components/view/ShadeView';
import useFadeAnim from '../../hooks/useFadeAnim';
import useReset from '../../hooks/useReset';
import { RootState } from '../../store/reducers';

const AvoidTouch = styled.View`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  position: absolute;
`;

export default function TeamTips_6() {
  const { leader: isLeader } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const reset = useReset({ screenName: 'User' });

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    fadeOut();
    setTimeout(() => reset(), 1000);
  }, []);

  return (
    <>
      <LoggedInHeader />
      <CardScrollView home>
        <NoMatchCard isLeader={isLeader} />
        <AddOnsCard />
      </CardScrollView>
      <ShadeView fadeAnim={fadeAnim} />
      <AvoidTouch />
    </>
  );
}
