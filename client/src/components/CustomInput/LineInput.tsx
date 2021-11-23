import styled from 'styled-components/native';
import { colors } from '../../shared/colors';
import React, { useEffect, useState } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';

const getConditionColor = (condition: boolean, focused?: boolean) => {
  if (condition) {
    if (focused) {
      return colors.blue;
    }
    return colors.darkGray;
  } else {
    return colors.lightGray;
  }
};

const Container = styled.View`
  width: 100%;
  margin-top: 30px;
`;
const Title = styled.Text`
  font-size: 18px;
  margin-left: 10px;
  color: ${(props: { color: string }) => props.color};
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-bottom-color: ${(props: { color: string }) => props.color};
  border-bottom-width: 2.5px;
  font-size: 22px;
  margin-top: 13px;
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
`;

type LineInputProps = {
  control: Control<FieldValues, object>;
  name: string;
  title?: string;
  conditions?: { name: string; regex: RegExp }[];
  errorMessage?: string;
  placeholder: string;
  secureTextEntry?: boolean;
};

function LineInput({
  control,
  title,
  errorMessage,
  placeholder,
  name,
  conditions,
  secureTextEntry,
}: LineInputProps) {
  useEffect(() => {
    if (errorMessage) {
      showError();
    }
  }, [errorMessage]);

  const { field } = useController({ control, defaultValue: '', name });

  const [focused, setFocused] = useState<boolean>(false);
  const [errored, setErrored] = useState<boolean>(false);

  const getFocus = () => setFocused(true);
  const loseFocus = () => setFocused(false);
  const showError = () => setErrored(true);
  const hideError = () => setErrored(false);

  const getInputColor = (focused: boolean, errored?: boolean, line?: boolean) => {
    if (errored) {
      return colors.red;
    } else if (focused) {
      return colors.blue;
    } else {
      if (line) {
        if (field.value !== '') {
          return colors.darkGray;
        }
        return colors.lightGray;
      } else {
        return colors.darkGray;
      }
    }
  };

  const onChangeText = (text: string) => {
    field.onChange(text);
    if (errored === true) {
      hideError();
    }
  };

  const getSubtitle = (errored: boolean, conditions?: { name: string; regex: RegExp }[]) => {
    if (errored) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    } else if (conditions) {
      return (
        <ConditionsContainer>
          {conditions.map((el) => (
            <Condition key={el.name} focused={focused} condition={el.regex.test(field.value)}>
              ✓{el.name}
            </Condition>
          ))}
        </ConditionsContainer>
      );
    }
  };

  return (
    <Container>
      {title && <Title color={getInputColor(focused, errored)}>{title}</Title>}
      <TextInput
        onFocus={getFocus}
        onBlur={loseFocus}
        color={getInputColor(focused, errored, true)}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        value={field.value}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="off"
        spellCheck={false}
      />
      {getSubtitle(errored, conditions)}
    </Container>
  );
}

export default LineInput;
