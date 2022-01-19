import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

type IntroPageViewProps = {
  children: React.ReactNode;
};

export default function IntroPageView({ children }: IntroPageViewProps) {
  return <Container>{children}</Container>;
}
