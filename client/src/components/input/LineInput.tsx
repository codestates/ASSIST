import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import React, { useState } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import { Regular } from '../../theme/fonts';
import { Ionicons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import ValidationTimer from './ValidationTimer';
import getTextValues from '../../hooks/getTextValues';

const getConditionColor = (condition: boolean, focused?: boolean) => {
  if (condition) {
    if (focused) {
      return colors.blue;
    }
    return colors.darkGray;
  } else {
    return colors.gray;
  }
};

const Container = styled.View`
  width: 100%;
  margin-top: ${(props: { marginTop?: string }) => props.marginTop || '30px'};
`;

const InputContainer = styled.View`
  position: relative;
`;

const Title = styled(Regular)`
  font-size: 15px;
  margin-left: 10px;
  color: ${(props: { color: string }) => props.color};
`;

const TextInput = styled.TextInput`
  width: 100%;
  padding: 5px 45px 5px 10px;
  border-bottom-color: ${(props: { color: string }) => props.color};
  border-bottom-width: 2px;
  font-size: 18px;
  margin-top: 10px;
  color: ${colors.darkGray};
`;

const Message = styled.Text`
  margin-top: 13px;
  margin-left: 10px;
`;

const ErrorMessage = styled(Message)`
  color: ${colors.red};
`;

const ConditionsContainer = styled.View`
  flex-direction: row;
`;

const Condition = styled(Message)`
  color: ${(props: { condition: boolean; focused?: boolean }) =>
    getConditionColor(props.condition, props.focused)};
  margin-top: 12px;
`;

const getClearButton = ({ value, focused }: ClearButtonType) => {
  if (value !== 'undefined' && value.length > 0 && focused) return 'flex';
  return 'none';
};

type ClearButtonType = {
  value: string;
  focused: boolean;
  isTimer?: boolean;
  width: number;
};

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 5px;
  right: ${(props: ClearButtonType) => (props.isTimer ? props.width - 5 : 15)}px;
  display: ${(props: ClearButtonType) => getClearButton(props)};
`;

type LineInputProps = {
  control: Control<FieldValues, object>;
  name: string;
  title?: string;
  conditions?: { name: string; regex: RegExp | boolean }[];
  errorMessage: string;
  placeholder: string;
  secureTextEntry?: boolean;
  clearErrorMessage: () => void;
  type?: 'phone' | 'money' | 'timer' | 'password' | 'date';
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  marginTop?: string;
};

export default function LineInput({
  control,
  title,
  errorMessage,
  placeholder,
  name,
  conditions,
  clearErrorMessage,
  type,
  setErrorMessage,
  marginTop,
}: LineInputProps) {
  const timerWidth = useWindowDimensions().width * 0.27;
  const { field } = useController({ control, defaultValue: '', name });
  const [focused, setFocused] = useState<boolean>(false);
  const isError = errorMessage.length > 0;

  const getFocus = () => setFocused(true);
  const loseFocus = () => setFocused(false);

  const getInputColor = (focused: boolean, errored?: boolean, line?: boolean) => {
    if (errored) {
      return colors.red;
    } else if (focused) {
      return colors.blue;
    } else {
      if (line) {
        if (field.value !== '') {
          return colors.gray;
        }
        return colors.lightGray;
      } else {
        if (field.value !== '') {
          return colors.darkGray;
        }
        return colors.gray;
      }
    }
  };

  const TimerExpiredError = "'재전송'을 누르고, 새 번호를 입력해 주세요.";

  const getKeyboardType = () => {
    if (type === 'phone' || type === 'money' || type === 'date') return 'number-pad';
    return 'default';
  };

  const onChangeText = (text: string) => {
    field.onChange(text);
    if (isError && errorMessage !== TimerExpiredError) {
      clearErrorMessage();
    }
  };

  const clearInput = () => {
    field.onChange('');
    if (isError && errorMessage !== TimerExpiredError) {
      clearErrorMessage();
    }
  };

  const getSubtitle = (
    errored: boolean,
    conditions?: { name: string; regex: RegExp | boolean }[],
  ) => {
    if (errored) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    } else if (conditions) {
      return (
        <ConditionsContainer>
          {conditions.map((el) => (
            <Condition
              key={el.name}
              focused={focused}
              condition={
                typeof el.regex === 'boolean' ? el.regex : el.regex.test(String(field.value))
              }>
              ✓{el.name}
            </Condition>
          ))}
        </ConditionsContainer>
      );
    }
  };

  const getMaxLength = () => {
    if (type === 'phone') return 13;
    if (type === 'timer') return 6;
    if (type === 'password') return 15;
    if (type === 'money') return 8;
    if (type === 'date') return 2;
    return undefined;
  };

  return (
    <Container marginTop={marginTop}>
      {title && <Title color={getInputColor(focused, isError)}>{title}</Title>}
      <InputContainer>
        <TextInput
          keyboardType={getKeyboardType()}
          placeholderTextColor={colors.lightGray}
          onFocus={getFocus}
          onBlur={loseFocus}
          color={getInputColor(focused, isError, true)}
          placeholder={placeholder}
          secureTextEntry={type === 'password'}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
          spellCheck={false}
          value={getTextValues({ text: String(field.value), type })}
          onChangeText={(text) => onChangeText(text)}
          maxLength={getMaxLength()}
        />
        <ClearButton
          width={timerWidth}
          isTimer={type === 'timer'}
          onPress={() => clearInput()}
          focused={focused}
          value={String(field.value)}>
          <Ionicons name="close-circle" size={22} color={colors.lightGray} />
        </ClearButton>
      </InputContainer>
      {getSubtitle(isError, conditions)}
      {type === 'timer' && (
        <ValidationTimer setErrorMessage={setErrorMessage} clearInput={() => field.onChange('')} />
      )}
    </Container>
  );
}
