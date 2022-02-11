import { useNavigation } from '@react-navigation/native';
import React from 'react';
import NextButton from '../../components/button/NextButton';
import SkipButton from '../../components/button/SkipButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import { StackNavigationProp } from '@react-navigation/stack';
import LineSelect from '../../components/input/LineSelect';
import useLineSelect from '../../hooks/useLineSelect';
import useProps from '../../hooks/useProps';
import { addCreateTeam } from '../../store/actions/propsAction';

export default function CreateTeam_2() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    createTeam: { paymentDay },
  } = useProps();
  const { isPressed, onPress } = useLineSelect();

  const getDate = (value: number) => {
    if (!value) {
      return undefined;
    } else if (value === 32) {
      return '말일';
    }
    return `${value}일`;
  };

  const goToNext = () => {
    navigation.navigate('CreateTeam_3');
  };

  const goToSelect = () => {
    onPress();
    navigation.navigate('PaymentDaySelect', { name: 'CreateTeam_2' });
  };

  const skipToEnd = () => {
    navigation.navigate('CreateTeam_5');
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>팀 회비 납부일</Bold>
            <Light size={22}>을</Light>
          </>
          <Light size={22}>알려 주세요 📅</Light>
        </MainTitle>
        <SubTitle>
          <Light>회비 납부 1일 전, 팀원들에게 납부 알림을 보내드려요.</Light>
        </SubTitle>
        <LineSelect
          title="회비 납부일"
          isPressed={isPressed}
          selected={getDate(paymentDay)}
          reset={addCreateTeam({ paymentDay: 0 })}
          onPress={() => goToSelect()}
        />
      </NextPageView>
      <SkipButton onPress={skipToEnd} />
      <NextButton disabled={false} onPress={goToNext} />
    </>
  );
}
