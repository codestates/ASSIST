import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.SafeAreaView`
  width: ${(props: HeaderProps) => props.width}px;
  height: ${(props: HeaderProps) => (props.height ? String(props.height) + 'px' : 'auto')};
  background-color: ${colors.white};
`;

type HeaderProps = {
  width: number;
  height?: number;
};

type HeaderContainerProps = {
  children: React.ReactNode;
  height?: number;
};

export default function HeaderContainer({ children, height }: HeaderContainerProps) {
  const { width } = useWindowDimensions();
  return (
    <Container width={width} height={height}>
      {children}
    </Container>
  );
}
