import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.SafeAreaView`
  width: ${(props: { width: number }) => props.width}px;
  background-color: ${colors.white};
`;

type HeaderContainerProps = {
  children: React.ReactNode;
};

export default function HeaderContainer({ children }: HeaderContainerProps) {
  const screenWidth = useWindowDimensions().width;
  return <Container width={screenWidth}>{children}</Container>;
}
