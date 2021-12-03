import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LineInput from '../../components/input/LineInput';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import SubTitle from '../../components/text/SubTitle';
import { Bold, Light, Regular } from '../../theme/fonts';
import { StackScreenProps } from '@react-navigation/stack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components/native';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';

const schema = yup.object({
  invitationCode: yup
    .string()
    .matches(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,6}$/)
    .required(),
});

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

type JoinTeamProps = StackScreenProps<RootStackParamList, 'JoinTeam_1'>;

export default function JoinTeam_1({ route }: JoinTeamProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const showErrorModal = () => {
    setError();
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const [errorMessage, setErrorMessage] = useState('');
  const setError = () => setErrorMessage(' ');
  const clearError = () => setErrorMessage('');

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
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>초대 코드가 일치하지 않습니다.</Bold>
          <Line>
            <Regular gray size={13}>
              오타는 없는지 다시 한 번 확인 해주세요.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton text="돌아가기  >" onPress={hideErrorModal} />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>팀 초대 코드</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>입력해 주세요 🎁</Light>
        </MainTitle>
        <SubTitle>
          <Light>초대 코드는 팀의 주장님이 알고 있을 거에요!</Light>
        </SubTitle>
        <LineInput
          clearErrorMessage={clearError}
          control={control}
          title="초대 코드"
          name="invitationCode"
          placeholder="초대 코드를 입력해주세요"
          errorMessage={errorMessage}
          conditions={[
            {
              name: `글자수 ${String(watch('invitationCode') || '').length}/6`,
              regex: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,6}$/,
            },
          ]}
        />
      </NextPageView>
      <NextButton disabled={!isValid || Boolean(errorMessage)} onPress={() => goToNext()} />
    </>
  );
}
