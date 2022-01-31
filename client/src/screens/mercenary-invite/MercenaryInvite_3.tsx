import React from 'react';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import SubTitle from '../../components/text/SubTitle';
import { useDispatch } from 'react-redux';
import { addMercenaryMember } from '../../store/actions/propsAction';
import CounterInput from '../../components/input/CounterInput';

export default function MercenaryInvite_3() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { control, getValues } = useForm({ mode: 'onChange' });

  const getMercenaryMoney = () => {
    dispatch(addMercenaryMember({ money: String(getValues('money')) }));
    navigation.navigate('MercenaryInvite_4');
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
        <CounterInput marginTop={64} control={control} name="money" />
      </NextPageView>
      <NextButton disabled={false} onPress={() => getMercenaryMoney()} />
    </>
  );
}
