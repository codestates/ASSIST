import React, { useState } from 'react';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LineInput from '../../components/input/LineInput';
import NextButton from '../../components/button/NextButton';
import { StackScreenProps } from '@react-navigation/stack';
import LineSelect from '../../components/input/LineSelect';

const schema = yup.object({
  phone: yup
    .string()
    .matches(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/)
    .required(),
});

type GetStartedProps = StackScreenProps<RootStackParamList, 'GetStarted_3'>;

export default function GetStarted_3({ route }: GetStartedProps) {
  const {
    control,
    handleSubmit,
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
            <Bold size={22}>보내드린 문자 인증번호</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>입력해주세요</Light>
        </MainTitle>
        <LineSelect title="휴대폰 번호" selected={route.params?.phone} isFixed />
        <LineInput
          control={control}
          title="인증번호"
          name="validation"
          placeholder="인증번호를 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
        />
      </NextPageView>
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => console.log('clicked!')}
      />
    </>
  );
}
