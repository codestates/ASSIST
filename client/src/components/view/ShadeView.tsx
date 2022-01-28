import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Container = styled(Animated.View)`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  ${(props: ShadeViewProps) =>
    props.isNoLayout && 'justify-content: flex-end; padding-bottom: 40px;'}
`;

type ShadeViewProps = {
  children?: React.ReactNode;
  isNoLayout?: boolean;
  fadeAnim?: Animated.Value;
};

export default function ShadeView({ fadeAnim, children, isNoLayout }: ShadeViewProps) {
  return (
    <Container style={{ opacity: fadeAnim }} isNoLayout={isNoLayout}>
      {children}
    </Container>
  );
}
