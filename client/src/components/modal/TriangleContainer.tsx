import React from 'react';
import styled from 'styled-components/native';

import { colors } from '../../theme/colors';

const TriangleDirection = (direction: string) => {
  switch (direction) {
    case 'top':
      return `
        border-left-width: 16px; 
        border-left-color: ${colors.whiteSmoke}; 
        border-right-width: 16px; 
        border-right-color: ${colors.whiteSmoke}; 
        border-bottom-width: 16px; 
        border-bottom-color: ${colors.darkGray}
      `;
    case 'bottom':
      return `
        border-width: 16px 16px 0; 
        border-top-color: ${colors.darkGray}
        border-left-width: 16px; 
        border-left-color: ${colors.whiteSmoke}; 
        border-right-width: 16px; 
        border-right-color: ${colors.whiteSmoke}; 
      `;
    default:
      return;
  }
};

const TriangleContainer = styled.View`
  position: absolute;
  width: 16px;
  height: 32px;
  background-color: ${(props: TriangleProps) => props.bgColor}
  top: ${(props: TriangleProps) => (props.top ? props.top : 'none')};
  left: ${(props: TriangleProps) => (props.left ? props.left : 'none')};
  right: ${(props: TriangleProps) => (props.right ? props.right : 'none')}
  bottom: ${(props: TriangleProps) => (props.bottom ? props.bottom : 'none')}
  ${(props: TriangleProps) => props.direction && TriangleDirection(props.direction)}
`;

type TriangleProps = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  direction: string;
  bgColor: string;
};

const Triangle = (props: TriangleProps) => {
  const { top, left, right, bottom, direction, bgColor } = props;
  return (
    <TriangleContainer
      direction={direction}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      bgColor={bgColor}
    />
  );
};

export default Triangle;
