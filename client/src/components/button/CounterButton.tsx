import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';
import { colors } from '../../theme/colors';

const OperationButton = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Title = styled.View`
  flex: 3;
  height: 100%;
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
};

export default function CounterButton(props: CounterButtonProps) {
  const { text, type } = props;

  const [person, setPerson] = useState(0);
  const [counter, setCounter] = useState(0);
  const [money, setMoney] = useState(0);

  const handleDecrement = () => {
    if (type === 'person') {
      setPerson((prevNumber) => (prevNumber - 1 < 0 ? 0 : prevNumber - 1));
    } else if (type === 'money') {
      setMoney((prevNumber) => (prevNumber - 1000 < 0 ? 0 : prevNumber - 1000));
    } else {
      setCounter((prevNumber) => (prevNumber - 1 < 0 ? 0 : prevNumber - 1));
    }
  };

  const handleIncrement = () => {
    if (type === 'person') {
      setPerson((prevNumber) => prevNumber + 1);
    } else if (type === 'money') {
      setMoney((prevNumber) => prevNumber + 1000);
    } else {
      setCounter((prevNumber) => prevNumber + 1);
    }
  };

  return (
    <>
      <CounterContainer>
        <OperationButton onPress={handleDecrement}>
          <AntDesign name="minus" />
        </OperationButton>
        <Title>
          <Bold size={17}>
            {type === 'person' ? person : type === 'money' ? money : counter}
            {text}
          </Bold>
        </Title>
        <OperationButton onPress={handleIncrement}>
          <AntDesign name="plus" />
        </OperationButton>
      </CounterContainer>
    </>
  );
}
