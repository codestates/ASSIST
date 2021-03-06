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
import { StackScreenProps } from '@react-navigation/stack';
import LineSelect from '../../components/input/LineSelect';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import styled from 'styled-components/native';
import useVerifySms from '../../hooks/useVerifySms';

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const schema = yup.object({
  validation: yup.string().min(6).max(6).required(),
});

type FindPasswordProps = StackScreenProps<RootStackParamList, 'FindPassword_1'>;

export default function FindPassword_1({ route }: FindPasswordProps) {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const verifySms = useVerifySms({
    phone: String(route.params?.phone),
    number: String(getValues('validation')),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const showErrorModal = () => {
    setError();
    setModalVisible(true);
  };

  const setError = () => setErrorMessage(' ');
  const clearError = () => setErrorMessage('');

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const goToNext = async () => {
    try {
      await verifySms();
      navigation.navigate('FindPassword_2', { code: Number(getValues('validation')) });
    } catch (error) {
      console.log(error);
      showErrorModal();
    }
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>??????????????? ???????????? ????????????.</Bold>
          <Line>
            <Regular gray size={13}>
              ????????? ????????? ?????? ??? ??? ??????????????????.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton text="????????????  >" onPress={hideErrorModal} />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>???????????? ?????? ????????????</Bold>
            <Light size={22}>???</Light>
          </>
          <Light size={22}>??????????????????</Light>
        </MainTitle>
        <LineSelect title="????????? ??????" selected={route.params?.phone} isFixed />
        <LineInput
          type="timer"
          control={control}
          title="????????????"
          name="validation"
          placeholder="??????????????? ??????????????????"
          errorMessage={errorMessage}
          clearErrorMessage={clearError}
          setErrorMessage={setErrorMessage}
          phone={route.params?.phone}
        />
      </NextPageView>
      <NextButton disabled={!isValid || Boolean(errorMessage)} onPress={() => goToNext()} />
    </>
  );
}
