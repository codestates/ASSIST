import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Bold, Regular } from '../../theme/fonts';
import { colors } from '../../theme/colors';

const Container = styled.View`
  height: 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CounterLeftTitle = styled.View`
  flex: 1;
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

const CounterRightTitle = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default function CounterButton() {
  const [counter, setCounter] = useState(0);

  const handleDecrement = () => {
    setCounter((prevNumber) => (prevNumber - 1 < 0 ? 0 : prevNumber - 1));
  };

  const handleIncrement = () => {
    setCounter((prevNumber) => prevNumber + 1);
  };

  return (
    <Container>
      <CounterLeftTitle>
        <Regular>경기 시작</Regular>
      </CounterLeftTitle>
      <CounterContainer>
        <OperationButton onPress={handleDecrement}>
          <AntDesign name="minus" />
        </OperationButton>
        <Title>
          <Bold size={17}>{counter}일전</Bold>
        </Title>
        <OperationButton onPress={handleIncrement}>
          <AntDesign name="plus" />
        </OperationButton>
      </CounterContainer>
      <CounterRightTitle>
        <Regular>마감</Regular>
      </CounterRightTitle>
    </Container>
  );
}
