import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';

export default function CreateTeamSix() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <FinishPageView onPress={() => navigation.navigate('Home')}>
      <>
        <Bold size={20}>팀 생성이 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
