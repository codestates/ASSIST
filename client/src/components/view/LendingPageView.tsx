import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import AvoidKeyboard from './AvoidKeyboard';
import DismissKeyboard from './DismissKeyboard';

const Container = styled.View`
  flex: 1;
  width: 100%;
  padding: 0px 20px 0px 20px;
  background-color: ${colors.white};
`;

type LendingPageViewProps = {
  children: React.ReactNode;
};

export default function LendingPageView({ children }: LendingPageViewProps) {
  return (
    <AvoidKeyboard>
      <DismissKeyboard>
        <Container>{children}</Container>
      </DismissKeyboard>
    </AvoidKeyboard>
  );
}
