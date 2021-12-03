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

const TitleSpaceContents = styled.View`
  width: 100%;
  height: 64px;
`;

type ScheduleManageProps = StackScreenProps<RootStackParamList, 'ScheduleManage_3'>;

export default function ScheduleManage_3({ route }: ScheduleManageProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            투표 마감 시간<Light size={22}>을</Light>
          </Bold>
          <Light size={22}>선택해 주세요</Light>
        </MainTitle>
        <SubTitle>
          <Light size={14}>마감 시간 후 참석 여부가 바뀌는 팀원이 생기면 알려드려요</Light>
        </SubTitle>
        <TitleSpaceContents />
        <CounterButton />
      </NextPageView>
      <NextButton
        disabled={false}
        onPress={() => {
          navigation.navigate('ScheduleManage_4');
        }}
      />
    </>
  );
}
