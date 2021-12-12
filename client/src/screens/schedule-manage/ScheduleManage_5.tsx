import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';

export default function ScheduleManage_5() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <FinishPageView buttonText="투표 하러 가기" onPress={() => navigation.navigate('Home')}>
      <>
        <Bold size={20}>일정 공지가 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
