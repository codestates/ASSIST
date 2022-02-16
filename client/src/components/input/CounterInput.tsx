import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import getTextValues from '../../functions/getTextValues';
import toNumber from '../../functions/toNumber';
import { colors } from '../../theme/colors';

const Container = styled.View`
  width: 100%;
  align-items: center;
  ${(props: { marginTop?: number }) => props.marginTop && `margin-top : ${props.marginTop}px`};
`;

const Border = styled.View`
  width: 90%;
  padding: 0% 5%;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.blue};
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  width: 100%;
  font-size: 18px;
  color: ${colors.blue};
  font-family: 'SpoqaHanSansNeo-Bold';
  ${Platform.OS === 'web' && 'outline-width: 0px;'}
  padding-bottom: 5px;
  text-align: center;
`;

type CounterInputProps = {
  name: 'money' | 'person' | 'deadline';
  control: Control<FieldValues, object>;
  marginTop?: number;
};

export default function CounterInput({ control, name, marginTop }: CounterInputProps) {
  const getDefaultValue = () => {
    if (name === 'money') {
      return '₩10,000';
    } else if (name === 'person') {
      return '1 명';
    } else if (name === 'deadline') {
      return '2 일전';
    }
    return '';
  };

  const { field } = useController({ control, defaultValue: getDefaultValue(), name });

  const onPressPlus = () => {
    const value = toNumber(field.value);
    if (name === 'money') {
      if (value < 999000) {
        const addedValue = String(value + 1000);
        field.onChange(getTextValues({ text: addedValue, type: 'money' }));
      } else if (value >= 999000 && value < 1000000) {
        field.onChange(getTextValues({ text: '999999', type: 'money' }));
      }
    } else if (name === 'person') {
      if (value < 10) {
        const addedValue = String(value + 1);
        field.onChange(addedValue + ' 명');
      }
    } else if (name === 'deadline') {
      if (value < 7) {
        const addedValue = String(value + 1);
        field.onChange(addedValue + ' 일전');
      }
    }
  };

  const onPressMinus = () => {
    const value = toNumber(field.value);
    if (name === 'money') {
      if (value > 999) {
        const minusedValue = String(value - 1000);
        field.onChange(getTextValues({ text: minusedValue, type: 'money' }));
      } else if (value <= 999 && value > 0) {
        field.onChange(getTextValues({ text: '0', type: 'money' }));
      }
    } else if (name === 'person') {
      if (value > 1) {
        const addedValue = String(value - 1);
        field.onChange(addedValue + ' 명');
      }
    } else if (name === 'deadline') {
      if (value > 1) {
        const addedValue = String(value - 1);
        field.onChange(addedValue + ' 일전');
      }
    }
  };

  const onChangeText = (text: string) => {
    const value = getTextValues({ text, type: 'money' });
    if (value.length > 0) {
      return field.onChange(value);
    }
    return field.onChange('₩0');
  };

  return (
    <Container marginTop={marginTop}>
      <Border>
        <Button onPress={onPressMinus}>
          <Entypo name="minus" size={21} color={colors.gray} />
        </Button>
        <Input
          keyboardType="number-pad"
          autoCorrect={false}
          autoCompleteType="off"
          spellCheck={false}
          value={String(field.value)}
          onChangeText={onChangeText}
          maxLength={8}
          editable={name === 'money'}
          selectTextOnFocus={name === 'money'}
        />
        <Button onPress={onPressPlus}>
          <Entypo name="plus" size={21} color={colors.gray} />
        </Button>
      </Border>
    </Container>
  );
}
