import React from 'react';
import { Animated, LayoutChangeEvent, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { LayoutType } from '../../../@types/global/types';
import { colors } from '../../theme/colors';

type StyleProps = {
  width: number;
  margin?: number;
  layout?: LayoutType;
};

const Container = styled(Animated.View)`
  box-shadow: ${(props: StyleProps) =>
    props.layout ? `0px 0px 5px ${colors.white}` : '0px 5px 3px rgba(0, 0, 0, 0.2)'};
  background-color: ${colors.white};
  padding: ${(props: StyleProps) =>
    `${props.width * 0.08}px ${props.width * 0.08}px ${props.width * 0.1}px ${
      props.width * 0.08
    }px`};
  border-radius: 15px;
  width: ${(props: StyleProps) => (props.layout ? `${props.layout.width}px` : '100%')};
  ${(props: StyleProps) =>
    props.layout && `position: absolute; top: ${props.layout.top}px; left: ${props.layout.left}px;`}
`;

type CardProps = {
  layout?: LayoutType;
  children: React.ReactNode;
  margin?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  fadeAnim?: Animated.Value;
};

export default function Card({ fadeAnim, children, layout, onLayout }: CardProps) {
  const { width } = useWindowDimensions();
  return (
    <Container style={{ opacity: fadeAnim }} onLayout={onLayout} layout={layout} width={width}>
      {children}
    </Container>
  );
}
