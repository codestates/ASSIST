import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BoldText, LightText } from '../../components/text/SharedText';
import FinishPageView from '../../components/view/FinishPageView';

export default function CreateTeamSix() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <FinishPageView onPress={() => navigation.navigate('Home')}>
      <>
        <BoldText size={20}>팀 생성이 완료</BoldText>
        <LightText size={20}>되었어요!</LightText>
      </>
    </FinishPageView>
  );
}
