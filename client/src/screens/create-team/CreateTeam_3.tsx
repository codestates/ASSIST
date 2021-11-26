import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import SkipButton from '../../components/button/SkipButton';
import LineInput from '../../components/input/LineInput';
import LineSelect from '../../components/input/LineSelect';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BoldText, LightText, SubText } from '../../components/text/SharedText';

type CreateTeamThreeProps = StackScreenProps<RootStackParamList, 'CreateTeam_3'>;

export default function CreateTeam_3({ route }: CreateTeamThreeProps) {
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
            <BoldText>팀 회비 납부계좌</BoldText>
            <LightText>를</LightText>
          </>
          <LightText>알려주세요 💳</LightText>
        </MainTitle>
        <SubTitle>
          <SubText>회비 납부 전날에 납부 정보를 팀원들에게 보내드려요</SubText>
        </SubTitle>
        <LineSelect
          title="은행"
          selected={route.params?.bank}
          onPress={() => navigation.navigate('BankSelect')}
        />
        <LineInput
          control={control}
          title="계좌번호"
          name="id"
          placeholder="계좌번호를 입력해주세요"
          errorMessage={errors.id?.message}
          conditions={[
            {
              name: '숫자, 하이픈(-)만 사용',
              regex: /^^[0-9]+(-[0-9]+)+$$/,
            },
          ]}
        />
      </NextPageView>
      <SkipButton onPress={() => navigation.navigate('CreateTeam_4')} />
      <NextButton onPress={() => navigation.navigate('CreateTeam_4')} />
    </>
  );
}
