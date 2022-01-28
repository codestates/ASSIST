import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { LayoutProps, LayoutType } from '../../../@types/global/types';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';

const Container = styled(Animated.View)`
  border-radius: 15px;
  position: absolute;
  align-items: center;
  justify-content: center;
  width: ${(props: ContainerProps) => props.layout?.width}px;
  height: ${(props: ContainerProps) => props.layout?.height}px;
  top: ${(props: ContainerProps) => props.layout?.top}px;
  left: ${(props: ContainerProps) => props.layout?.left}px;
  background-color: ${(props: ContainerProps) => props.color};
  box-shadow: 0px 0px 10px ${colors.white};
  ${(props: ContainerProps) =>
    props.color === `${colors.white}` && `border-color: ${colors.blue}; border-width: 1.2px`}
`;

const Text = styled(Regular)`
  color: ${(props: ContainerProps) => props.color};
  font-size: ${(props: ContainerProps) => (props.layout?.height || 50) / 3.84}px;
`;

interface ContainerProps extends LayoutProps {
  color: string;
}

type FakeButtonProps = {
  text: string;
  color: string;
  layout: LayoutType;
  fadeAnim?: Animated.Value;
};

export default function FakeButton({ fadeAnim, text, color, layout }: FakeButtonProps) {
  const getTextcolor = () => {
    if (color === 'blue') {
      return colors.white;
    } else if (color === 'white') {
      return colors.blue;
    }
    return colors.white;
  };

  const getButtonColor = () => {
    if (color === 'blue') {
      return colors.blue;
    } else if (color === 'white') {
      return colors.white;
    }
    return colors.blue;
  };

  return (
    <Container style={{ opacity: fadeAnim }} layout={layout} color={getButtonColor()}>
      <Text color={getTextcolor()}>{text}</Text>
    </Container>
  );
}
