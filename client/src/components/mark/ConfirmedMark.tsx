import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const Container = styled.View`
  width: 75px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: #cce2ef;
`;

export default function ConfirmedMark() {
  return (
    <Container>
      <Medium blue size={12}>
        경기 확정
      </Medium>
    </Container>
  );
}
