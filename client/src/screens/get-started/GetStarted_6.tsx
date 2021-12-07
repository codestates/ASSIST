import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';

export default function GetStarted_6() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // 온보딩 페이지
  return (
    <FinishPageView
      buttonText="어시스트 소개 보기  >"
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <>
        <Bold size={20}>회원 가입이 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
