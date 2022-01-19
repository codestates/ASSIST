import React from 'react';
import styled from 'styled-components/native';
import DotsHeader from '../header/DotsHeader';

const Container = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

type DotsIndicatorProps = {
  current: number;
  total: number;
};

export default function DotsIndicator({ current, total }: DotsIndicatorProps) {
  return (
    <Container>
      <DotsHeader isIntro current={current} total={total} />
    </Container>
  );
}
