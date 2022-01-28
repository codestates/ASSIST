import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { LayoutType } from '../../../@types/global/types';
import { colors } from '../../theme/colors';
import { Bold } from '../../theme/fonts';

const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  position: absolute;
  height: ${(props: FakeTeamSelectorProps) => props.layout.height}px;
  top: ${(props: FakeTeamSelectorProps) => props.layout.top}px;
  left: ${(props: FakeTeamSelectorProps) => props.layout.left}px;
  box-shadow: 0px 0px 5px ${colors.white};
`;

const Title = styled(Bold)`
  color: ${(props: { teamName?: string }) => (props.teamName ? colors.blue : colors.lightGray)};
  font-size: 17px;
  margin-right: 2px;
`;

type FakeTeamSelectorProps = {
  layout: LayoutType;
  teamName?: string;
  fadeAnim?: Animated.Value;
};

export default function FakeTeamSelector({ fadeAnim, layout, teamName }: FakeTeamSelectorProps) {
  return (
    <Container style={{ opacity: fadeAnim }} teamName={teamName} layout={layout}>
      <Title teamName={teamName}>{teamName ? teamName : '용병활동'}</Title>
      {teamName && <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.blue} />}
    </Container>
  );
}
