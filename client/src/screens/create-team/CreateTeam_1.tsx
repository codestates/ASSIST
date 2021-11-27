import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  teamName: yup
    .string()
    .matches(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,14}$/)
    .required(),
});

export default function CreateTeam_1() {
  const {
    control,
    handleSubmit,
    watch,
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
            <Bold size={22}>팀 이름</Bold>
            <Light size={22}>을</Light>
          </>
          <Light size={22}>알려주세요 ⚽️</Light>
        </MainTitle>
        <SubTitle>
          <Light>팀 이름은 언제든 수정이 가능합니다.</Light>
        </SubTitle>
        <LineInput
          control={control}
          title="팀 이름"
          name="teamName"
          placeholder="팀 이름을 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: `글자수 ${String(watch('teamName') || '').length}/14`,
              regex: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,14}$/,
            },
          ]}
        />
      </NextPageView>
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => navigation.navigate('CreateTeam_2')}
      />
    </>
  );
}
