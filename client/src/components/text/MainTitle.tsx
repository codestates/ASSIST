import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-bottom: 20px;
`;

const Line = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

type MainTitleProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function MainTitle({ children }: MainTitleProps) {
  return (
    <Container>
      {Array.isArray(children) ? (
        Array.from(Array(children.length), (_, i) => <Line key={i}>{children[i]}</Line>)
      ) : (
        <Line>{children}</Line>
      )}
    </Container>
  );
}
