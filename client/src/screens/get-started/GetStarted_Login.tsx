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
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useDispatch } from 'react-redux';
import { getAccessToken, getUserInfo, UserInfoType } from '../../store/actions/userAction';
import useRequestSms from '../../hooks/useRequestSms';
import useReset from '../../hooks/useReset';

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
    formState: { isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const requestSms = useRequestSms({ phone: route.params?.phone });
  const resetUser = useReset({ screenName: 'User' });
  const resetIntro = useReset({ screenName: 'Intro' });
  const resetTips = useReset({ screenName: 'QuickTips' });

  const setError = () => setErrorMessage(' ');
  const clearError = () => setErrorMessage('');

  const showErrorModal = () => {
    setError();
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const goToFindPassword = async (isModal?: boolean) => {
    if (isModal) {
      hideErrorModal();
    }
    await requestSms();
    navigation.navigate('FindPassword', {
      screenName: 'GetStarted_Login',
      phone: route.params?.phone,
      email: route.params?.email,
    });
  };

  const requestLogin = async () => {
    try {
      const {
        data: { accessToken },
      }: AxiosResponse<{ accessToken: string }> = await axios.post(
        `${ASSIST_SERVER_URL}/user/signin`,
        {
          email: String(route.params?.email),
          password: String(getValues('password')),
          provider: 'normal',
        },
      );
      const { data }: AxiosResponse<UserInfoType> = await axios.get(`${ASSIST_SERVER_URL}/user`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      dispatch(getUserInfo(data));
      dispatch(getAccessToken(accessToken));
      if (data.role === 'complete' || data.role === 'tips2') {
        resetUser();
      } else if (data.role === 'tips') {
        resetTips();
      } else {
        resetIntro();
      }
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
          <Bold size={17}>??????????????? ?????? ?????? ????????????</Bold>
          <Line>
            <Regular gray size={13}>
              ????????? ????????? ?????? ??? ??? ????????? ?????????.
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="????????????" onPress={hideErrorModal} />
        <Seperator />
        <CommonModalButton
          color="transparent"
          text="??????????????? ???????????????  >"
          onPress={() => goToFindPassword(true)}
        />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <Light size={22}>{route.params?.name}???</Light>
          <Bold size={22}>?????? ????????? ????????????????</Bold>
        </MainTitle>
        <LineSelect isFixed title="?????????" selected={route.params?.email} />
        <Seperator />
        <LineInput
          type="password"
          control={control}
          title="????????????"
          name="password"
          placeholder="??????????????? ??????????????????"
          errorMessage={errorMessage}
          clearErrorMessage={clearError}
        />
      </NextPageView>
      <SkipButton text="??????????????? ???????????????  >" onPress={() => goToFindPassword()} />
      <NextButton
        text="?????????  >"
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => requestLogin()}
      />
    </>
  );
}
