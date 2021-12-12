import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold } from '../../theme/fonts';

const Container = styled.View`
  width: ${(props: CaptainMarkProps) => (props.size === 'small' ? '18px' : '25px')};
  height: ${(props: CaptainMarkProps) => (props.size === 'small' ? '14px' : '17px')};
  justify-content: center;
  align-items: center;
  background-color: ${colors.yellow};
`;

type CaptainMarkProps = {
  size?: 'small' | 'large';
};

export default function CaptainMark({ size }: CaptainMarkProps) {
  return (
    <Container size={size}>
      <Bold size={size === 'small' ? 12 : 13}>C</Bold>
    </Container>
  );
}
