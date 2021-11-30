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

const schema = yup.object({
  password_1: yup
    .string()
    .min(8)
    .matches(/[a-zA-Z]/)
    .matches(/[0-9]/)
    .matches(/[~!@#$%^&*()_+|<>?:{}]/)
    .required(),
  password_2: yup
    .string()
    .oneOf([yup.ref('password_1'), null])
    .required(),
});

export default function GetStarted_4() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorMessage = () => setErrorMessage('');
  const onSubmit = (data: string) => {
    console.log(data);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>비밀번호</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>설정해주세요 🔐</Light>
        </MainTitle>
        <SubTitle>
          <Light>회비 납부 전날에 납부 알림을 보내드릴게요.</Light>
        </SubTitle>
        <LineInput
          type="password"
          control={control}
          title="비밀번호"
          name="password_1"
          placeholder="비밀번호를 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '8자리 이상',
              regex: /^.{8,}$/,
            },
            {
              name: '영문',
              regex: /[a-zA-Z]/,
            },
            {
              name: '숫자',
              regex: /[0-9]/,
            },
            {
              name: '특수문자',
              regex: /[~!@#$%^&*()_+|<>?:{}]/,
            },
          ]}
        />
        <LineInput
          type="password"
          control={control}
          title="비밀번호 재입력"
          name="password_2"
          placeholder="비밀번호를 재입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '일치',
              regex:
                String(watch('password_1')).length > 0 &&
                String(watch('password_1')) === String(watch('password_2')),
            },
          ]}
        />
      </NextPageView>
      <SkipButton onPress={() => navigation.navigate('CreateTeam_3')} />
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => navigation.navigate('CreateTeam_3')}
      />
    </>
  );
}
