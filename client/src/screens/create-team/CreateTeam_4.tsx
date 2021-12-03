import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SkipButton from '../../components/button/SkipButton';

const schema = yup.object({
  fee: yup.number().required(),
});

export default function CreateTeam_4() {
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
            <Bold size={22}>팀의 월 회비</Bold>
            <Light size={22}>는</Light>
          </>
          <Light size={22}>얼마인가요? 💰</Light>
        </MainTitle>
        <SubTitle>
          <Light>회비 납부 전날에 납부 정보를 팀원들에게 보내드려요</Light>
        </SubTitle>
        <LineInput
          control={control}
          title="월 회비 금액"
          name="fee"
          placeholder="회비 금액을 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '숫자만 입력',
              regex: /^\d+$/,
            },
          ]}
        />
      </NextPageView>
      <SkipButton onPress={() => navigation.navigate('CreateTeam_5')} />
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => navigation.navigate('CreateTeam_5')}
      />
    </>
  );
}
