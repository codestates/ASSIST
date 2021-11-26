import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/native';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { Bold, Light } from '../../theme/fonts';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { BoldText, LightText } from '../../components/text/SharedText';

const SubText = styled(Light)`
  color: ${colors.darkGray};
`;

export default function CreateTeam_4() {
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
            <BoldText>팀의 월 회비</BoldText>
            <LightText>는</LightText>
          </>
          <LightText>얼마인가요? 💰</LightText>
        </MainTitle>
        <SubTitle>
          <SubText>회비 납부 전날에 납부 정보를 팀원들에게 보내드려요</SubText>
        </SubTitle>
        <LineInput
          control={control}
          title="월 회비 금액"
          name="teamName"
          placeholder="회비 금액을 입력해주세요"
          errorMessage={errors.id?.message}
          conditions={[
            {
              name: '숫자만 입력',
              regex: /^\d+$/,
            },
          ]}
        />
      </NextPageView>
      <NextButton onPress={() => navigation.navigate('CreateTeam_5')} />
    </>
  );
}
