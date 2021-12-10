import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import SkipButton from '../../components/button/SkipButton';
import LineInput from '../../components/input/LineInput';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addCreateTeam } from '../../store/actions/propsAction';

const schema = yup.object({
  date: yup
    .string()
    .matches(/^(0?[1-9]|[12][0-9])$/)
    .required(),
});
1;

export default function CreateTeam_2() {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorMessage = () => setErrorMessage('');

  const goToNext = () => {
    dispatch(addCreateTeam({ paymentDay: Number(getValues('date')) }));
    navigation.navigate('CreateTeam_3');
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
        <LineInput
          type="date"
          control={control}
          title="매월"
          name="date"
          placeholder="일자를 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '숫자',
              regex: /^\d+$/,
            },
            {
              name: '1~29 사이',
              regex: /^(0?[1-9]|[12][0-9])$/,
            },
          ]}
        />
      </NextPageView>
      <SkipButton onPress={() => navigation.navigate('CreateTeam_3')} />
      <NextButton disabled={!isValid || Boolean(errorMessage)} onPress={() => goToNext()} />
    </>
  );
}
