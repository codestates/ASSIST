import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import React, { useEffect, useState } from 'react';
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

const Message = styled.Text`
  margin-top: 13px;
  margin-left: 10px;
`;

const ErrorMessage = styled(Message)`
  color: ${colors.red};
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
`;

type LineSelectProps = {
  title?: string;
  errorMessage?: string;
  selected?: string;
  onPress?: () => void;
};

export default function LineSelect({ errorMessage, title, selected, onPress }: LineSelectProps) {
  useEffect(() => {
    if (errorMessage) {
      showError();
    }
  }, [errorMessage]);

  const [errored, setErrored] = useState<boolean>(false);

  const showError = () => setErrored(true);
  const hideError = () => setErrored(false);

  return (
    <Container>
      {title && <Title color={selected ? colors.darkGray : colors.gray}>{title}</Title>}
      <SelectInput onPress={onPress} color={selected ? colors.gray : colors.lightGray}>
        <Selected color={selected ? colors.darkGray : colors.lightGray}>
          {selected || '은행을 선택해주세요'}
        </Selected>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={23}
          color={selected ? colors.gray : colors.lightGray}
        />
      </SelectInput>
    </Container>
  );
}
