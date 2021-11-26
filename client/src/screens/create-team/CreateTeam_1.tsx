import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { BoldText, LightText, SubText } from '../../components/text/SharedText';

export default function CreateTeam_1() {
  const {
    control,
    handleSubmit,
    watch,
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
            <BoldText>팀 이름</BoldText>
            <LightText>을</LightText>
          </>
          <LightText>알려주세요 ⚽️</LightText>
        </MainTitle>
        <SubTitle>
          <SubText>팀 이름은 언제든 수정이 가능합니다.</SubText>
        </SubTitle>
        <LineInput
          control={control}
          title="팀 이름"
          name="teamName"
          placeholder="팀 이름을 입력해주세요"
          errorMessage={errors.id?.message}
          conditions={[
            {
              name: `글자수 ${String(watch('teamName') || '').length}/14`,
              regex: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,14}$/,
            },
          ]}
        />
      </NextPageView>
      <NextButton onPress={() => navigation.navigate('CreateTeam_2')} />
    </>
  );
}
