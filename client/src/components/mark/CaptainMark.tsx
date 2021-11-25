import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold } from '../../theme/fonts';

export const Container = styled.View`
  width: 28px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.yellow};
`;

export default function CaptainMark() {
  return (
    <Container>
      <Bold>C</Bold>
    </Container>
  );
}
