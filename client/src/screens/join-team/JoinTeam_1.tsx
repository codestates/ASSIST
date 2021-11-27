import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { Bold, Light } from '../../theme/fonts';
import { StackScreenProps } from '@react-navigation/stack';

type JoinTeamProps = StackScreenProps<RootStackParamList, 'JoinTeam_1'>;

export default function JoinTeam_1({ route }: JoinTeamProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.reset) {
        reset({ invitationCode: '' });
      }
    });
    return unsubscribe;
  }, [route.params?.reset, navigation, reset]);

  const goToNext = () => {
    navigation.setParams({ reset: false });
    navigation.navigate('JoinTeam_2');
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>팀 초대 코드</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>알려주세요 🎁</Light>
        </MainTitle>
        <SubTitle>
          <Light>초대 코드는 팀의 주장님이 알고 있을 거에요!</Light>
        </SubTitle>
        <LineInput
          control={control}
          title="초대 코드"
          name="invitationCode"
          placeholder="초대 코드를 입력해주세요"
          errorMessage={errors.id?.message}
          conditions={[
            {
              name: `글자수 ${String(watch('invitationCode') || '').length}/6`,
              regex: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,6}$/,
            },
          ]}
        />
      </NextPageView>
      <NextButton onPress={() => goToNext()} />
    </>
  );
}
