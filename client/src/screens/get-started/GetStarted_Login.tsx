import React, { useState } from 'react';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { Bold, Light, Regular } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LineInput from '../../components/input/LineInput';
import NextButton from '../../components/button/NextButton';
import styled from 'styled-components/native';
import SkipButton from '../../components/button/SkipButton';
import { StackScreenProps } from '@react-navigation/stack';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import LineSelect from '../../components/input/LineSelect';

const schema = yup.object({
  password: yup.string().required(),
});

const Seperator = styled.View`
  height: 15px;
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

type GetStartedProps = StackScreenProps<RootStackParamList, 'GetStarted_Login'>;

export default function GetStarted_Login({ route }: GetStartedProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setError = () => setErrorMessage(' ');
  const clearError = () => setErrorMessage('');
  const onSubmit = (data: string) => {
    console.log(data);
  };
  const showErrorModal = () => {
    setError();
    setModalVisible(true);
  };
  const hideErrorModal = () => {
    setModalVisible(false);
  };
  const goToFindPassword = () => {
    hideErrorModal();
    navigation.navigate('FindPassword', { screenName: 'GetStarted_Login' });
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>비밀번호를 잘못 입력 하셨어요</Bold>
          <Line>
            <Regular gray size={13}>
              오타는 없는지 다시 한 번 확인해 주세요.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="돌아가기" onPress={hideErrorModal} />
        <Seperator />
        <CommonModalButton
          color="transparent"
          text="비밀번호를 모르겠어요  >"
          onPress={() => goToFindPassword()}
        />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <Light size={22}>홍*길동님</Light>
          <Bold size={22}>다시 만나서 반가워요👋</Bold>
        </MainTitle>
        <LineSelect isFixed title="이메일" selected={route.params?.email} />
        <Seperator />
        <LineInput
          type="password"
          control={control}
          title="비밀번호"
          name="password"
          placeholder="비밀번호을 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearError}
        />
      </NextPageView>
      <SkipButton
        text="비밀번호를 모르겠어요  >"
        onPress={() => navigation.navigate('FindPassword', { screenName: 'GetStarted_Login' })}
      />
      <NextButton
        text="로그인  >"
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => showErrorModal()}
      />
    </>
  );
}
