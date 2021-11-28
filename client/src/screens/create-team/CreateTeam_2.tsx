import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import SkipButton from '../../components/button/SkipButton';
import LineInput from '../../components/input/LineInput';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';

export default function CreateTeam_2() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: string) => {
    console.log(data);
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
          <Light size={22}>알려주세요 📅</Light>
        </MainTitle>
        <SubTitle>
          <Light>회비 납부 전날에 납부 알림을 보내드릴게요.</Light>
        </SubTitle>
        <LineInput
          control={control}
          title="매월"
          name="date"
          placeholder="일자를 입력해주세요"
          errorMessage={errors.id?.message}
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
      <NextButton onPress={() => navigation.navigate('CreateTeam_3')} />
    </>
  );
}
