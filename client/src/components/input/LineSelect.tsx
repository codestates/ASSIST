import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import React from 'react';
import { Regular } from '../../theme/fonts';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';

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

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ResetButton = styled.TouchableOpacity`
  margin-right: 8px;
  margin-left: 3px;
  margin-bottom: 2px;
`;

type LineSelectProps = {
  title: string;
  selected?: string;
  onPress?: () => void;
  reset?: { type: string; payload: object };
  isPressed?: boolean;
  isFixed?: boolean;
  placeholder?: string;
};

export default function LineSelect({
  title,
  selected,
  onPress,
  isPressed,
  isFixed,
  placeholder,
  reset,
}: LineSelectProps) {
  const dispatch = useDispatch();
  const onReset = () => {
    if (reset) {
      dispatch(reset);
    }
  };
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

  const getSelected = () => {
    if (selected) {
      return selected;
    } else if (placeholder) {
      return placeholder;
    } else {
      return `${title}을 선택해주세요`;
    }
  };

  return (
    <Container>
      {<Title color={getInputColor(title)}>{title}</Title>}
      <SelectInput disabled={isFixed} onPress={onPress} color={getInputColor()}>
        <ScrollView horizontal>
          <Selected color={getSelectedColor()}>{getSelected()}</Selected>
        </ScrollView>
        <Wrapper>
          {!!selected && !isFixed && reset && (
            <ResetButton onPress={onReset}>
              <Ionicons name="close-circle" size={22} color={colors.lightGray} />
            </ResetButton>
          )}
          {isFixed || (
            <MaterialIcons name="keyboard-arrow-down" size={23} color={getInputColor()} />
          )}
        </Wrapper>
      </SelectInput>
    </Container>
  );
}
