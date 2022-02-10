import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import NextButton from '../../components/button/NextButton';
import SkipButton from '../../components/button/SkipButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import { useDispatch } from 'react-redux';
import { addCreateTeam } from '../../store/actions/propsAction';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import LineSelect from '../../components/input/LineSelect';

type CreateTeamProps = StackScreenProps<RootStackParamList, 'CreateTeam_2'>;

export default function CreateTeam_2({ route }: CreateTeamProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const getDate = (value?: string) => {
    if (value === '말일') {
      return 32;
    }
    return Number(value?.slice(0, value.length - 1));
  };

  const goToNext = () => {
    dispatch(addCreateTeam({ paymentDay: getDate(route.params?.paymentDay) }));
    navigation.navigate('CreateTeam_3');
  };

  const goToSelect = () => {
    setIsPressed(true);
    navigation.navigate('PaymentDaySelect', { name: 'CreateTeam_2' });
  };

  const skipToEnd = () => {
    dispatch(addCreateTeam({ paymentDay: 0, accountBank: '', accountNumber: '', dues: '' }));
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
          selected={route.params?.paymentDay}
          onPress={() => goToSelect()}
        />
      </NextPageView>
      <SkipButton onPress={skipToEnd} />
      <NextButton disabled={route.params?.paymentDay === undefined} onPress={goToNext} />
    </>
  );
}
