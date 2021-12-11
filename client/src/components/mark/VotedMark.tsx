import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Medium } from '../../theme/fonts';

const Container = styled.View`
  width: 75px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGray};
`;

export default function VotedMark() {
  return (
    <Container>
      <Medium size={12}>투표 완료</Medium>
    </Container>
  );
}
