import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const Item = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  margin-bottom: 40px;
`;

const Arrow = styled(Bold)`
  line-height: 19px;
  margin-left: 20px;
  color: ${colors.lightGray};
  font-size: 18px;
`;

const Title = styled(Regular)`
  color: ${colors.gray};
  margin-right: 10px;
  flex-shrink: 0;
`;
        
type SummaryItemProps = {
  onPress: () => void;
  title: string;
  value?: string | number;
};

export default function SummaryItem({ onPress, value, title }: SummaryItemProps) {
  const getValue = () => {
    if (!value) {
      return <Bold lightGray>미입력</Bold>;
    } else {
      return <Bold blue>{value}</Bold>;
    }
  };

  return (
    <Item onPress={onPress}>
      <Title>{title}</Title>
      <ScrollView
        style={{ flexDirection: 'row-reverse' }}
        contentContainerStyle={{ justifyContent: 'flex-end' }}
        horizontal>
        {getValue()}
      </ScrollView>
      <Arrow>&gt;</Arrow>
    </Item>
  );
}
