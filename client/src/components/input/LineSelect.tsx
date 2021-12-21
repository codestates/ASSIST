import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import React from 'react';
import { Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';

const Container = styled.View`
  width: 100%;
  margin-top: 30px;
`;

const Title = styled(Regular)`
  font-size: 15px;
  margin-left: 10px;
  color: ${(props: { color: string }) => props.color};
`;

const SelectInput = styled.TouchableOpacity`
  width: 100%;
  padding: 5px 10px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 2px;
  border-bottom-color: ${(props: { color: string }) => props.color};
`;

const Selected = styled(Regular)`
  font-size: 18px;
  color: ${(props: { color: string }) => props.color};
  font-family: 'SpoqaHanSansNeo-Regular';
`;

type LineSelectProps = {
  title: string;
  selected?: string;
  onPress?: () => void;
  isPressed?: boolean;
  isFixed?: boolean;
};

export default function LineSelect({
  title,
  selected,
  onPress,
  isPressed,
  isFixed,
}: LineSelectProps) {
  const getInputColor = (title?: string) => {
    if (isPressed) {
      return colors.blue;
    } else if (selected && !isFixed) {
      if (title) return colors.darkGray;
      return colors.gray;
    } else {
      if (title) return colors.gray;
      return colors.lightGray;
    }
  };

  const getSelectedColor = () => {
    if (selected && !isFixed) {
      return colors.darkGray;
    } else if (isFixed) {
      return colors.gray;
    } else {
      return colors.lightGray;
    }
  };

  return (
    <Container>
      {<Title color={getInputColor(title)}>{title}</Title>}
      <SelectInput disabled={isFixed} onPress={onPress} color={getInputColor()}>
        <Selected color={getSelectedColor()}>{selected || `${title}을 선택해주세요`}</Selected>
        {isFixed || <MaterialIcons name="keyboard-arrow-down" size={23} color={getInputColor()} />}
      </SelectInput>
    </Container>
  );
}
