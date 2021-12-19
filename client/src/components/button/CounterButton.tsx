import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Bold } from '../../theme/fonts';
import { colors } from '../../theme/colors';

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

type CounterButtonProps = {
  text: string;
  type: string;
  counter: number;
  getCounter: (counter: number) => number;
};

function CounterButton(props: CounterButtonProps) {
  const { text, type, counter, getCounter } = props;

  const [money, setMoney] = useState(0);

  const handleDecrement = () => {
    if (type === 'person' || type === 'day') {
      getCounter(counter - 1 < 1 ? 1 : counter - 1);
    } else if (type === 'money') {
      setMoney((currentNumber) => (currentNumber - 1000 < 0 ? 0 : currentNumber - 1000));
    }
  };

  const handleIncrement = () => {
    if (type === 'person' || type === 'day') {
      getCounter(counter + 1);
    } else if (type === 'money') {
      setMoney((currentNumber) => currentNumber + 1000);
    }
  };

  return (
    <>
      <CounterContainer>
        <OperationButton onPress={handleDecrement}>
          <AntDesign name="minus" />
        </OperationButton>
        <TitleContainer>
          <Bold size={17}>{type === 'person' || type === 'day' ? counter : money}</Bold>
          <Bold size={17}>{text}</Bold>
        </TitleContainer>
        <OperationButton onPress={handleIncrement}>
          <AntDesign name="plus" />
        </OperationButton>
      </CounterContainer>
    </>
  );
}

export default CounterButton;
