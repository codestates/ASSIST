import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import SubTitle from '../../components/text/SubTitle';
import CounterButton from '../../components/button/CounterButton';
import { useDispatch } from 'react-redux';
import { addMercenaryMember } from '../../store/actions/propsAction';

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

export default function MercenaryInvite_3() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [money, setMoney] = useState(0);

  const getMercenaryMoney = () => {
    dispatch(addMercenaryMember({ money: money }));
    navigation.navigate('MercenaryInvite_4');
  };

  const getMoney = (money: number) => {
    setMoney(money);
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            참가비<Light size={22}>를</Light>
          </Bold>
          <Light size={22}>설정 해 주세요 💸</Light>
        </MainTitle>
        <SubTitle>
          <Light size={14}>1,000원 단위로 조정하거나 직접 입력 할 수 있어요.</Light>
        </SubTitle>
        <TitleSpaceContents />
        <CounterContainer>
          <CounterSpace />
          <CounterButton counter={money} getCounter={getMoney} type="money" />
          <CounterSpace />
        </CounterContainer>
      </NextPageView>
      <NextButton disabled={false} onPress={() => getMercenaryMoney()} />
    </>
  );
}
