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
  const resetLanding = useReset({ screenName: 'Landing' });

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
      if (data.role === 'complete') {
        resetUser();
      } else if (data.role === 'tips') {
        // 팁으로 넘어가기
      } else {
        resetLanding();
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
          onPress={() => goToFindPassword(true)}
        />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <Light size={22}>{route.params?.name}님</Light>
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
      <SkipButton text="비밀번호를 모르겠어요  >" onPress={() => goToFindPassword()} />
      <NextButton
        text="로그인  >"
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => requestLogin()}
      />
    </>
  );
}
