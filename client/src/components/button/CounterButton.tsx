import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { Bold } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import { RootState } from '../../store/reducers';
import { addScheduleManage } from '../../store/actions/propsAction';

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
};

function CounterButton(props: CounterButtonProps) {
  const { text, type } = props;
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.propsReducer.scheduleManage);
  const matchDate = new Date(date);
  const year = matchDate.getFullYear();
  const month = matchDate.getMonth();
  const day = matchDate.getDate();

  const [person, setPerson] = useState(0);
  const [counter, setCounter] = useState(0);
  const [money, setMoney] = useState(0);

  const handleDecrement = () => {
    if (type === 'person') {
      setPerson((currentNumber) => (currentNumber - 1 < 0 ? 0 : currentNumber - 1));
    } else if (type === 'money') {
      setMoney((currentNumber) => (currentNumber - 1000 < 0 ? 0 : currentNumber - 1000));
    } else {
      setCounter((currentNumber) => (currentNumber - 1 < 0 ? 0 : currentNumber - 1));
    }
    if (counter !== 0) {
      dispatch(
        addScheduleManage({
          deadline: new Date(year, month, day + 1 - counter + 1).toISOString().slice(0, 10),
        }),
      );
    }
  };

  const handleIncrement = () => {
    if (type === 'person') {
      setPerson((currentNumber) => currentNumber + 1);
    } else if (type === 'money') {
      setMoney((currentNumber) => currentNumber + 1000);
    } else {
      setCounter((currentNumber) => currentNumber + 1);
    }
    dispatch(
      addScheduleManage({
        deadline: new Date(year, month, day - counter).toISOString().slice(0, 10),
      }),
    );
  };

  return (
    <>
      <CounterContainer>
        <OperationButton onPress={handleDecrement}>
          <AntDesign name="minus" />
        </OperationButton>
        <TitleContainer>
          <Bold size={17}>{type === 'person' ? person : type === 'money' ? money : counter}</Bold>
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
