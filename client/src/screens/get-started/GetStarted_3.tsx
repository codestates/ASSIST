import React, { useState } from 'react';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { Bold, Light, Medium, Regular, Thin } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LineInput from '../../components/input/LineInput';
import NextButton from '../../components/button/NextButton';
import { StackScreenProps } from '@react-navigation/stack';
import LineSelect from '../../components/input/LineSelect';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import styled from 'styled-components/native';

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const schema = yup.object({
  validation: yup.string().min(6).max(6).required(),
});

type GetStartedProps = StackScreenProps<RootStackParamList, 'GetStarted_3'>;

export default function GetStarted_3({ route }: GetStartedProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const showErrorModal = () => {
    setError();
    setModalVisible(true);
  };

  const setError = () => setErrorMessage(' ');
  const clearError = () => setErrorMessage('');

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>인증번호가 일치하지 않습니다.</Bold>
          <Line>
            <Regular gray size={13}>
              오타는 없는지 다시 한 번 확인해주세요.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton text="돌아가기  >" onPress={hideErrorModal} />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>보내드린 문자 인증번호</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>입력해주세요</Light>
        </MainTitle>
        <LineSelect title="휴대폰 번호" selected={route.params?.phone} isFixed />
        <LineInput
          type="timer"
          control={control}
          title="인증번호"
          name="validation"
          placeholder="인증번호를 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearError}
        />
      </NextPageView>
      <NextButton
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => navigation.navigate('GetStarted_4')}
      />
    </>
  );
}
