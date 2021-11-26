import React from 'react';
import styled from 'styled-components/native';

import { colors } from '../../theme/colors';

const Container = styled.View`
  position: absolute;
  width: 304px;
  height: 164px;
  background-color: ${(props: SquareProps) => props.bgColor};
  border-radius: 16px;
  padding-horizontal: 32px;
  padding-vertical: 24px;
`;

type SquareProps = {
  bgColor: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  children: React.ReactNode;
};

const Square = (props: SquareProps) => {
  const { top, left, right, bottom, bgColor, children } = props;
  return (
    <Container top={top} left={left} right={right} bottom={bottom} bgColor={bgColor}>
      {children}
    </Container>
  );
};

export default Square;
