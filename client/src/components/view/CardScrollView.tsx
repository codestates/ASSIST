import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

const ScrollView = styled.ScrollView`
  width: 100%;
  background-color: ${(props: { color?: string }) => props.color || colors.lightGray};
`;

type styleProps = {
  color?: string;
  home?: boolean;
};

const View = styled.View`
  width: 100%;
  background-color: ${(props: styleProps) => props.color || colors.lightGray};
  padding: ${(props: styleProps) => (props.home ? '30px' : '0px')} 20px;
  ${(props: styleProps) =>
    props.home &&
    `border-top-color: ${colors.lightGray};
  border-top-width: 1.5px;`}
`;

type CardScrollViewProps = { children: React.ReactNode; color?: string; home?: boolean };

export default function CardScrollView({ children, color, home }: CardScrollViewProps) {
  return (
    <ScrollView color={color} contentContainerStyle={{ flexGrow: 1 }}>
      <View home={home} color={color}>
        {children}
      </View>
    </ScrollView>
  );
}
