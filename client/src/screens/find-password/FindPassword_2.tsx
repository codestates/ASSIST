import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import LineInput from '../../components/input/LineInput';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components/native';
import { StackScreenProps } from '@react-navigation/stack';
import useEditProfile from '../../hooks/useEditProfile';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useDispatch } from 'react-redux';
import { getAccessToken, getUserInfo, UserInfoType } from '../../store/actions/userAction';
import { useToast } from 'react-native-toast-notifications';
import useReset from '../../hooks/useReset';

const Seperator = styled.View`
  height: 15px;
`;

const schema = yup.object({
  password_1: yup
    .string()
    .min(8)
    .matches(/[a-zA-Z]/)
    .matches(/[0-9]/)
    .matches(/[~!@#$%^&*()_+|<>?:{}]/)
    .required(),
  password_2: yup
    .string()
    .oneOf([yup.ref('password_1'), null])
    .required(),
});

type FindPasswordProps = StackScreenProps<RootStackParamList, 'FindPassword_2'>;

export default function FindPassword_2({ route }: FindPasswordProps) {
  const {
    control,
    formState: { isValid },
    watch,
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorMessage = () => setErrorMessage('');
  const editProfile = useEditProfile({
    password: String(getValues('password_1')),
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const resetUser = useReset({ screenName: 'User' });
  const resetIntro = useReset({ screenName: 'Intro' });
  const resetTips = useReset({ screenName: 'QuickTips' });

  const getButtonText = () => {
    if (route.params?.screenName === 'GetStarted_Login') {
      return '??? ??????????????? ?????????  >';
    }
    return '????????????';
  };

  const getScreenToGo = async () => {
    try {
      if (route.params?.screenName === 'MyPage_Main') {
        await editProfile();
      } else if (route.params?.screenName === 'GetStarted_Login') {
        const {
          data: { accessToken },
        }: AxiosResponse<{ accessToken: string }> = await axios.patch(
          `${ASSIST_SERVER_URL}/user/findpw`,
          {
            number: route.params?.code,
            email: route.params?.email,
            password: String(getValues('password_1')),
          },
        );
        const { data }: AxiosResponse<UserInfoType> = await axios.get(`${ASSIST_SERVER_URL}/user`, {
          headers: { authorization: `Bearer ${accessToken}` },
        });
        dispatch(getUserInfo(data));
        dispatch(getAccessToken(accessToken));
        toast.show('??????????????? ?????????????????????.');
        if (data.role === 'complete' || data.role === 'tips2') {
          resetUser();
        } else if (data.role === 'tips') {
          resetTips();
        } else {
          resetIntro();
        }
      } else {
        console.error('????????? ???????????????.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>????????? ????????????</Bold>
            <Light size={22}>???</Light>
          </>
          <Light size={22}>?????? ???????????? ????</Light>
        </MainTitle>
        <LineInput
          type="password"
          control={control}
          title="????????????"
          name="password_1"
          placeholder="??????????????? ??????????????????"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '8?????? ??????',
              regex: /^.{8,}$/,
            },
            {
              name: '??????',
              regex: /[a-zA-Z]/,
            },
            {
              name: '??????',
              regex: /[0-9]/,
            },
            {
              name: '????????????',
              regex: /[~!@#$%^&*()_+|<>?:{}]/,
            },
          ]}
        />
        <Seperator />
        <LineInput
          type="password"
          control={control}
          title="???????????? ?????????"
          name="password_2"
          placeholder="??????????????? ?????????????????????"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
          conditions={[
            {
              name: '??????',
              regex:
                Boolean(watch('password_1')) &&
                String(watch('password_1')) === String(watch('password_2')),
            },
          ]}
        />
      </NextPageView>
      <NextButton
        text={getButtonText()}
        disabled={!isValid || Boolean(errorMessage)}
        onPress={() => getScreenToGo()}
      />
    </>
  );
}
