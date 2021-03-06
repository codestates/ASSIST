import React, { useState } from 'react';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { Bold, Light, Regular } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LineInput from '../../components/input/LineInput';
import NextButton from '../../components/button/NextButton';
import { StackScreenProps } from '@react-navigation/stack';
import LineSelect from '../../components/input/LineSelect';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import styled from 'styled-components/native';
import useVerifySms from '../../hooks/useVerifySms';
import useEditProfile from '../../hooks/useEditProfile';
import useReset from '../../hooks/useReset';

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const schema = yup.object({
  validation: yup.string().min(6).max(6).required(),
});

type NewPhoneProps = StackScreenProps<RootStackParamList, 'NewPhone_2'>;

export default function NewPhone_2({ route }: NewPhoneProps) {
  const {
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const editProfile = useEditProfile({ phone: String(route.params?.phone) });
  const verifySms = useVerifySms({
    phone: String(route.params?.phone),
    number: String(getValues('validation')),
  });
  const reset = useReset({ screenName: 'MyPage_Main' });

  const showErrorModal = () => {
    setError();
    setModalVisible(true);
  };

  const setError = () => setErrorMessage(' ');
  const clearError = () => setErrorMessage('');

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const finishEditing = async () => {
    try {
      await verifySms();
      await editProfile();
      reset();
    } catch (error) {
      console.log(error);
      showErrorModal();
    }
  };

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>??????????????? ???????????? ????????????.</Bold>
          <Line>
            <Regular gray size={13}>
              ????????? ????????? ?????? ??? ??? ????????? ?????????.
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
          <Light size={22}>????????? ?????????</Light>
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
      <NextButton
        text="????????????"
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => finishEditing()}
      />
    </>
  );
}
