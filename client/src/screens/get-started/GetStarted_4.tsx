import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import LineInput from '../../components/input/LineInput';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { addPassword } from '../../store/actions/propsAction';

const Seperator = styled.View`
  height: 15px;
`;

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
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>비밀번호</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>설정해 주세요 🔐</Light>
        </MainTitle>
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
        <Seperator />
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
                Boolean(watch('password_1')) &&
                String(watch('password_1')) === String(watch('password_2')),
            },
          ]}
        />
      </NextPageView>
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => {
          dispatch(addPassword(String(getValues('password_1'))));
          navigation.navigate('GetStarted_5');
        }}
      />
    </>
  );
}
