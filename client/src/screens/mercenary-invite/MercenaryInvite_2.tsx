import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import SubTitle from '../../components/text/SubTitle';
import { addMercenaryMember } from '../../store/actions/propsAction';
import { useDispatch } from 'react-redux';
import CounterInput from '../../components/input/CounterInput';
import { useForm } from 'react-hook-form';
import toNumber from '../../functions/toNumber';

export default function MercenaryInvite_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { control, getValues } = useForm({ mode: 'onChange' });

  const getMercenaryNum = () => {
    dispatch(addMercenaryMember({ needNumber: toNumber(getValues('person')) }));
    navigation.navigate('MercenaryInvite_3');
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            필요한 용병 숫자<Light size={22}>를</Light>
          </Bold>
          <Light size={22}>선택해 주세요</Light>
        </MainTitle>
        <SubTitle>
          <Light size={14}>해당 인원 만큼 대신 구해드려요</Light>
        </SubTitle>
        <CounterInput marginTop={64} control={control} name="person" />
      </NextPageView>
      <NextButton disabled={false} onPress={() => getMercenaryNum()} />
    </>
  );
}
