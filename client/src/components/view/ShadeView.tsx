import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  ${(props: { isNoLayout?: boolean }) =>
    props.isNoLayout && 'justify-content: flex-end; padding-bottom: 40px;'}
`;

type ShadeViewProps = {
  children?: React.ReactNode;
  isNoLayout?: boolean;
};

export default function ShadeView({ children, isNoLayout }: ShadeViewProps) {
  return <Container isNoLayout={isNoLayout}>{children}</Container>;
}
