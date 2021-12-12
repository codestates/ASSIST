import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

type StyleProps = {
  width: number;
  margin?: number;
};

const Container = styled.View`
  box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.2);
  background-color: ${colors.white};
  padding: ${(props: StyleProps) =>
    `${props.width * 0.08}px ${props.width * 0.08}px ${props.width * 0.1}px ${
      props.width * 0.08
    }px`};
  border-radius: 15px;
  width: 100%;
  margin-top: ${(props: StyleProps) => props.margin || 0}px;
`;

type CardProps = {
  children: React.ReactNode;
  margin?: number;
};

export default function Card({ children, margin }: CardProps) {
  const { width } = useWindowDimensions();
  return (
    <Container margin={margin} width={width}>
      {children}
    </Container>
  );
}
