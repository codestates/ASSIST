import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const getPadding = (props: { isFinish?: boolean }) => {
  if (props.isFinish) {
    return '0px';
  } else {
    return `${Dimensions.get('window').height / 12}px`;
  }
};

const Container = styled.ScrollView`
  width: 100%;
  padding: ${(props: { isFinish?: boolean }) => getPadding(props)} 20px
    ${(props: { isFinish?: boolean }) => getPadding(props)} 20px;
  background-color: ${colors.white};
`;

type NextPageViewProps = {
  children: React.ReactNode;
  isFinish?: boolean;
};

export default function NextPageView({ children, isFinish }: NextPageViewProps) {
  return (
    <Container
      contentContainerStyle={{ flexGrow: 1, ...(isFinish && { justifyContent: 'center' }) }}
      isFinish={isFinish}>
      {children}
    </Container>
  );
}
