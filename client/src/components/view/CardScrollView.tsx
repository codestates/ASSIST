import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const ScrollView = styled.ScrollView`
  width: 100%;
  background-color: ${(props: { color?: string }) => props.color || colors.lightGray};
`;

const View = styled.View`
  width: 100%;
  background-color: ${(props: { color?: string }) => props.color || colors.lightGray};
  padding: 0px 20px;
`;

type CardScrollViewProps = { children: React.ReactNode; color?: string };

export default function CardScrollView({ children, color }: CardScrollViewProps) {
  return (
    <ScrollView color={color} contentContainerStyle={{ flexGrow: 1 }}>
      <View color={color}>{children}</View>
    </ScrollView>
  );
}
