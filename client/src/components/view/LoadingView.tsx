import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

type LoadingViewProps = {
  size?: 'small' | 'large';
};

export default function LoadingView({ size }: LoadingViewProps) {
  return (
    <Container>
      <ActivityIndicator color={colors.blue} size={size || 'large'} />
    </Container>
  );
}
