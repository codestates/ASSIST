import React from 'react';
import styled from 'styled-components/native';

type StyleProps = {
  spaceTop?: string;
  spaceBottom?: string;
};

const Container = styled.View`
  margin-bottom: ${(props: { marginBottom?: string }) => props.marginBottom || '20px'};
`;

const Line = styled.View`
  flex-direction: row;
  margin-bottom: ${(props: StyleProps) => props.spaceBottom || '5px'};
  margin-top: ${(props: StyleProps) => props.spaceTop || '0px'};
`;

type MainTitleProps = {
  children: React.ReactNode | React.ReactNode[];
  spaceTop?: string;
  spaceBottom?: string;
  marginBottom?: string;
};

export default function MainTitle({
  children,
  spaceTop,
  spaceBottom,
  marginBottom,
}: MainTitleProps) {
  return (
    <Container marginBottom={marginBottom}>
      {Array.isArray(children) ? (
        Array.from(Array(children.length), (_, i) => <Line key={i}>{children[i]}</Line>)
      ) : (
        <Line spaceBottom={spaceBottom} spaceTop={spaceTop}>
          {children}
        </Line>
      )}
    </Container>
  );
}
