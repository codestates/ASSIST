import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
  margin-bottom: 13px;
`;
const LogoContainer = styled.View`
  flex-direction: row;
`;
const BoxLogo = styled.Image`
  width: 21px;
  height: 21px;
  margin-top: 7px;
`;
const FontLogo = styled.Image`
  width: 77px;
  height: 23.3px;
  margin-left: 9px;
  margin-top: 3px;
`;

type TopContainerProps = {
  children?: React.ReactNode;
};

export default function TopContainer({ children }: TopContainerProps) {
  return (
    <Container>
      <LogoContainer>
        <BoxLogo source={require('../../assets/images/small-logo.png')} />
        <FontLogo source={require('../../assets/images/font-logo.png')} />
      </LogoContainer>
      {children}
    </Container>
  );
}
