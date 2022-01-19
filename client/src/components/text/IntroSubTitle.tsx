import React from 'react';
import styled from 'styled-components/native';
import { Regular } from '../../theme/fonts';

const Container = styled.View`
  margin-bottom: 20px;
`;

const RegularText = styled(Regular)`
  line-height: 160%;
`;

type IntroSubtitleProps = {
  text: string;
};

export default function IntroSubtitle({ text }: IntroSubtitleProps) {
  return (
    <Container>
      <RegularText>{text}</RegularText>
    </Container>
  );
}
