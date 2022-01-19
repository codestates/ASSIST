import React from 'react';
import styled from 'styled-components/native';
import { Bold } from '../../theme/fonts';

const Container = styled.View`
  margin-bottom: 20px;
`;

const BoldText = styled(Bold)`
  font-size: 18px;
  line-height: 170%;
`;

type IntroTitleProps = {
  text: string;
};

export default function IntroTitle({ text }: IntroTitleProps) {
  return (
    <Container>
      <BoldText>{text}</BoldText>
    </Container>
  );
}
