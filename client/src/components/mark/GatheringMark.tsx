import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const Container = styled.View`
  width: 75px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray};
`;

export default function GatheringMark() {
  return (
    <Container>
      <Medium white size={12}>
        인원 모집 중
      </Medium>
    </Container>
  );
}
