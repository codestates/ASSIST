import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const Item = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-bottom: 40px;
`;

const Value = styled.View`
  flex-direction: row;
`;

const Text = styled(Bold)`
  white-space: nowrap;
`;

const Arrow = styled(Bold)`
  line-height: 19px;
  margin-left: 20px;
  color: ${colors.lightGray};
  font-size: 18px;
`;

type SummaryItemProps = {
  onPress: () => void;
  title: string;
  value?: string | number;
};

export default function SummaryItem({ onPress, value, title }: SummaryItemProps) {
  const getValue = () => {
    if (!value) {
      return <Text lightGray>미입력</Text>;
    } else {
      return <Text blue>{value}</Text>;
    }
  };

  return (
    <Item onPress={onPress}>
      <Regular gray>{title}</Regular>
      <Value>
        {getValue()}
        <Arrow>&gt;</Arrow>
      </Value>
    </Item>
  );
}
