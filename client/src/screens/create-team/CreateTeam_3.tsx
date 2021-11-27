import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import SkipButton from '../../components/button/SkipButton';
import LineInput from '../../components/input/LineInput';
import LineSelect from '../../components/input/LineSelect';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  bankAccount: yup
    .string()
    .matches(/^^[0-9]+(-[0-9]+)+$$/)
    .required(),
});

type CreateTeamProps = StackScreenProps<RootStackParamList, 'CreateTeam_3'>;

export default function CreateTeam_3({ route }: CreateTeamProps) {
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
            <Bold size={22}>팀 회비 납부계좌</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>알려주세요 💳</Light>
        </MainTitle>
        <SubTitle>
          <Light>회비 납부 전날에 납부 정보를 팀원들에게 보내드려요</Light>
        </SubTitle>
        <LineSelect
          title="은행"
          selected={route.params?.bank}
          onPress={() => navigation.navigate('BankSelect')}
        />
        <LineInput
          control={control}
          title="계좌번호"
          name="bankAccount"
          placeholder="계좌번호를 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '숫자, 하이픈(-)만 사용',
              regex: /^^[0-9]+(-[0-9]+)+$$/,
            },
          ]}
        />
      </NextPageView>
      <SkipButton onPress={() => navigation.navigate('CreateTeam_4')} />
      <NextButton
        disabled={!isValid || route.params?.bank === undefined || Boolean(errorMessage)}
        onPress={() => navigation.navigate('CreateTeam_4')}
      />
    </>
  );
}
