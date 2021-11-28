import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-bottom: 20px;
`;

const Line = styled.View`
  flex-direction: row;
  margin-bottom: 2px;
`;

const LastLine = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

type SubTitleProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function SubTitle({ children }: SubTitleProps) {
  return (
    <Container>
      {Array.isArray(children) ? (
        Array.from(Array(children.length), (_, i) =>
          i === children.length - 1 ? (
            <LastLine key={i}>{children[i]}</LastLine>
          ) : (
            <Line key={i}>{children[i]}</Line>
          ),
        )
      ) : (
        <LastLine>{children}</LastLine>
      )}
    </Container>
  );
}
