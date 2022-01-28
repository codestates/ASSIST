import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import styled from 'styled-components/native';
import { LayoutType } from '../../../@types/global/types';
import { Animated } from 'react-native';

const Container = styled(Animated.View)`
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

type FakeMenuProps = { layout: LayoutType; fadeAnim?: Animated.Value };

export default function FakeMenu({ layout, fadeAnim }: FakeMenuProps) {
  return (
    <Container style={{ opacity: fadeAnim }} layout={layout}>
      <Ionicons name="person-circle-outline" size={35} color={colors.blue} />
    </Container>
  );
}
