import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import React, { useEffect, useState } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import { Regular } from '../../theme/fonts';

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
  margin-top: 30px;
`;
const Title = styled(Regular)`
  font-size: 15px;
  margin-left: 10px;
  color: ${(props: { color: string }) => props.color};
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 5px 10px;
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

type LineInputProps = {
  control: Control<FieldValues, object>;
  name: string;
  title?: string;
  conditions?: { name: string; regex: RegExp }[];
  errorMessage: string;
  placeholder: string;
  secureTextEntry?: boolean;
  clearErrorMessage?: () => void;
};

export default function LineInput({
  control,
  title,
  errorMessage,
  placeholder,
  name,
  conditions,
  secureTextEntry,
  clearErrorMessage,
}: LineInputProps) {
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

  const onChangeText = (text: string) => {
    field.onChange(text);
    if (isError) {
      clearErrorMessage();
    }
  };

  const getSubtitle = (errored: boolean, conditions?: { name: string; regex: RegExp }[]) => {
    if (errored) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    } else if (conditions) {
      return (
        <ConditionsContainer>
          {conditions.map((el) => (
            <Condition
              key={el.name}
              focused={focused}
              condition={el.regex.test(String(field.value))}>
              ✓{el.name}
            </Condition>
          ))}
        </ConditionsContainer>
      );
    }
  };

  return (
    <Container>
      {title && <Title color={getInputColor(focused, isError)}>{title}</Title>}
      <TextInput
        placeholderTextColor={colors.lightGray}
        onFocus={getFocus}
        onBlur={loseFocus}
        color={getInputColor(focused, isError, true)}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={String(field.value)}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="off"
        spellCheck={false}
        clearButtonMode="always"
      />
      {getSubtitle(isError, conditions)}
    </Container>
  );
}
