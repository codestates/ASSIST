import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 60px 10px 0px 10px;
  background-color: ${colors.white};
`;

type LandingPageViewProps = {
  children: React.ReactNode;
};

export default function LandingPageView({ children }: LandingPageViewProps) {
  return <Container>{children}</Container>;
}
