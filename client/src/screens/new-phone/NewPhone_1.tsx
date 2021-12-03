import React, { useEffect, useState } from 'react';
import NextPageView from '../../components/view/NextPageView';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LineInput from '../../components/input/LineInput';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';

const schema = yup.object({
  phone: yup
    .string()
    .matches(/^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/)
    .required(),
});

export default function NewPhone_1() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
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
            <Bold size={22}>새로운 번호</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>입력해 주세요</Light>
        </MainTitle>
        <LineInput
          type="phone"
          control={control}
          title="휴대폰 번호"
          name="phone"
          placeholder="번호만 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '올바른 번호',
              regex: /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/,
            },
          ]}
        />
      </NextPageView>
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => navigation.navigate('NewPhone_2', { phone: String(getValues('phone')) })}
      />
    </>
  );
}
