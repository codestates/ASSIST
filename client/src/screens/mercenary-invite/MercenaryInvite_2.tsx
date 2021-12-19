import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import SubTitle from '../../components/text/SubTitle';
import CounterButton from '../../components/button/CounterButton';
import { addMercenaryMember } from '../../store/actions/propsAction';
import { useDispatch } from 'react-redux';

const TitleSpaceContents = styled.View`
  width: 100%;
  height: 64px;
`;

const CounterSpace = styled.View`
  width: 15px;
  height: 100%;
`;

const CounterContainer = styled.View`
  height: 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default function MercenaryInvite_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);

  const getMercenaryNum = () => {
    dispatch(addMercenaryMember({ needNumber: counter }));
    navigation.navigate('MercenaryInvite_3');
  };

  const getCounter = (counter: number) => {
    setCounter(counter);
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            필요한 용병 숫자<Light size={22}>를</Light>
          </Bold>
          <Light size={22}>선택해 주세요</Light>
        </MainTitle>
        <SubTitle>
          <Light size={14}>해당 인원 만큼 대신 구해드려요</Light>
        </SubTitle>
        <TitleSpaceContents />
        <CounterContainer>
          <CounterSpace />
          <CounterButton counter={counter} getCounter={getCounter} text=" 명" type="person" />
          <CounterSpace />
        </CounterContainer>
      </NextPageView>
      <NextButton disabled={false} onPress={() => getMercenaryNum()} />
    </>
  );
}
