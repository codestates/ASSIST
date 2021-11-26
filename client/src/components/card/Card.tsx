import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.View`
  box-shadow: 2px 2px 8px rgba(60, 60, 60, 0.25);
  background-color: ${colors.white};
  padding: 32px;
  border-radius: 8px;
  width: 288px;
  height: 160px;
  align-items: flex-start;
  justify-content: center;
`;

type CardProps = {
  children: React.ReactNode;
};

const Card = (props: CardProps) => {
  const { children } = props;
  return <Container>{props.children}</Container>;
};

export default Card;
