import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const Container = styled.View`
  width: 75px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.red};
`;

export default function CanceledMark() {
  return (
    <Container>
      <Medium white size={12}>
        경기 취소
      </Medium>
    </Container>
  );
}
