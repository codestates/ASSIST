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
  box-shadow: ${(props: HeaderProps) =>
    props.isLobby ? '0px 0px 20px rgba(0, 0, 0, 0.15)' : 'none'};
  position: relative;
  z-index: 5;
`;

type HeaderProps = {
  width: number;
  height?: number;
  isLobby?: boolean;
};

type HeaderContainerProps = {
  children: React.ReactNode;
  height?: number;
  isLobby?: boolean;
};

export default function HeaderContainer({ children, height, isLobby }: HeaderContainerProps) {
  const { width } = useWindowDimensions();
  return (
    <Container isLobby={isLobby} width={width} height={height}>
      {children}
    </Container>
  );
}
