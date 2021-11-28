import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import FinishLendingPageView from '../../components/view/FinishLendingPageView';
import { Bold, Light } from '../../theme/fonts';

const Title = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function LendingPage_8() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <FinishLendingPageView onPress={() => navigation.navigate('Home')}>
      <Title>
        <Bold size={20}>
          회원가입을 완료 <Light size={20}>했어요!</Light>
        </Bold>
        <Light size={20}>신나는 풋살 라이프,</Light>
        <Light size={20}>어시스트와 함께 시작해 볼까요?</Light>
      </Title>
    </FinishLendingPageView>
  );
}
