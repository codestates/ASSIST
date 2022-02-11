import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const Container = styled.View`
  width: 75px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.blue};
`;

export default function FinishedMark() {
  return (
    <Container>
      <Medium white size={12}>
        경기 완료
      </Medium>
    </Container>
  );
}
