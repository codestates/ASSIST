import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Bold } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import getTextValues from '../../functions/getTextValues';

const OperationButton = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.View`
  flex: 3;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CounterContainer = styled.View`
  flex: 2.5;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 3px;
  border-bottom-color: ${colors.blue};
`;

const CounterText = styled(Bold)`
  font-size: 17px;
  color: ${colors.blue};
`;

type CounterButtonProps = {
  text?: string;
  type: string;
  counter: number;
  getCounter: (counter: number) => number;
};

function CounterButton(props: CounterButtonProps) {
  const { text, type, counter, getCounter } = props;

  const handleDecrement = () => {
    if (type === 'person' || type === 'day') {
      getCounter(counter - 1 < 1 ? 1 : counter - 1);
    } else if (type === 'money') {
      getCounter(counter - 1000 < 0 ? 0 : counter - 1000);
    }
  };

  const handleIncrement = () => {
    if (type === 'person' || type === 'day') {
      getCounter(counter + 1);
    } else if (type === 'money') {
      getCounter(counter + 1000);
    }
  };

  return (
    <>
      <CounterContainer>
        <OperationButton onPress={handleDecrement}>
          <AntDesign name="minus" />
        </OperationButton>
        <TitleContainer>
          <CounterText>
            {type === 'money' ? getTextValues({ text: String(counter), type: 'money' }) : counter}
          </CounterText>
          <CounterText>{text}</CounterText>
        </TitleContainer>
        <OperationButton onPress={handleIncrement}>
          <AntDesign name="plus" />
        </OperationButton>
      </CounterContainer>
    </>
  );
}

export default CounterButton;
