import React from 'react';
import styled from 'styled-components/native';
import smallLogo from '../../assets/images/small-logo.png';
import fontLogo from '../../assets/images/font-logo.png';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
  margin-bottom: 13px;
`;
const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const BoxLogo = styled.Image`
  width: 28px;
  height: 28px;
  margin-top: 7px;
  margin-bottom: 2px;
`;
const FontLogo = styled.Image`
  width: 77px;
  height: 28px;
  margin-left: 8px;
`;

type TopContainerProps = {
  children?: React.ReactNode;
};

export default function TopContainer({ children }: TopContainerProps) {
  return (
    <Container>
      <LogoContainer>
        <BoxLogo source={smallLogo} resizeMode="contain" />
        <FontLogo source={fontLogo} resizeMode="contain" />
      </LogoContainer>
      {children}
    </Container>
  );
}
