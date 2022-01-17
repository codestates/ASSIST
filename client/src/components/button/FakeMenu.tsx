import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import styled from 'styled-components/native';
import { LayoutType } from '../../../@types/global/types';

const Container = styled.View`
  position: absolute;
  box-shadow: 0px 0px 5px ${colors.white};
  top: ${(props: FakeMenuProps) => props.layout.top}px;
  left: ${(props: FakeMenuProps) => props.layout.left}px;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

type FakeMenuProps = { layout: LayoutType };

export default function FakeMenu({ layout }: FakeMenuProps) {
  return (
    <Container layout={layout}>
      <Ionicons name="person-circle-outline" size={35} color={colors.blue} />
    </Container>
  );
}
