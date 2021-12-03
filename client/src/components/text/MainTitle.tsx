import React from 'react';
import styled from 'styled-components/native';

type StyleProps = {
  marginTop?: string;
  marginBottom?: string;
};

const Container = styled.View`
  margin-bottom: 20px;
`;

const Line = styled.View`
  flex-direction: row;
  margin-bottom: ${(props: StyleProps) => props.marginBottom || '5px'};
  margin-top: ${(props: StyleProps) => props.marginTop || '0px'};
`;

type MainTitleProps = {
  children: React.ReactNode | React.ReactNode[];
  marginTop?: string;
  marginBottom?: string;
};

export default function MainTitle({ children, marginTop, marginBottom }: MainTitleProps) {
  return (
    <Container>
      {Array.isArray(children) ? (
        Array.from(Array(children.length), (_, i) => <Line key={i}>{children[i]}</Line>)
      ) : (
        <Line marginBottom={marginBottom} marginTop={marginTop}>
          {children}
        </Line>
      )}
    </Container>
  );
}
