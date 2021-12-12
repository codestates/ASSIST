import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const getPadding = () => {
  if (Platform.OS === 'android') {
    return '40px';
  } else if (Platform.OS === 'web') {
    return '20px';
  } else {
    return '0px';
  }
};

const Container = styled.SafeAreaView`
  width: ${(props: HeaderProps) => props.width}px;
  height: ${(props: HeaderProps) => (props.height ? String(props.height) + 'px' : 'auto')};
  background-color: ${colors.white};
  padding-top: ${getPadding()};
  justify-content: center;
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
