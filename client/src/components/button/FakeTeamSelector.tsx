import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components/native';
import { LayoutType } from '../../../@types/global/types';
import { colors } from '../../theme/colors';
import { Bold } from '../../theme/fonts';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  position: absolute;
  width: ${(props: FakeTeamSelectorProps) => props.layout.width}px;
  height: ${(props: FakeTeamSelectorProps) => props.layout.height}px;
  top: ${(props: FakeTeamSelectorProps) => props.layout.top}px;
  left: ${(props: FakeTeamSelectorProps) =>
    props.isTeamSelect ? props.layout.left - 7.5 : props.layout.left - 4}px;
  box-shadow: 0px 0px 5px ${colors.white};
`;

const Title = styled(Bold)`
  color: ${(props: { isTeamSelect?: boolean }) =>
    props.isTeamSelect ? colors.blue : colors.lightGray};
  font-size: 17px;
  margin-right: 2px;
`;

type FakeTeamSelectorProps = {
  layout: LayoutType;
  isTeamSelect?: boolean;
};

export default function FakeTeamSelector({ layout, isTeamSelect }: FakeTeamSelectorProps) {
  return (
    <Container isTeamSelect={isTeamSelect} layout={layout}>
      <Title isTeamSelect={isTeamSelect}>{isTeamSelect ? 'FC 살쾡이' : '용병활동'}</Title>
      {isTeamSelect && <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.blue} />}
    </Container>
  );
}
