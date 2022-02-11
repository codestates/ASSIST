import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const Container = styled.View`
  width: 75px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.yellow};
`;

export default function InGameMark() {
  return (
    <Container>
      <Medium size={12}>경기중</Medium>
    </Container>
  );
}
