import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import KakaoButton from '../../components/button/KakaoButton';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { Bold, Light } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LineInput from '../../components/input/LineInput';
import NextButton from '../../components/button/NextButton';
import { useDispatch } from 'react-redux';
import { addGetStarted } from '../../store/actions/propsAction';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import * as Linking from 'expo-linking';
import { getAccessToken, getUserInfo, UserInfoType } from '../../store/actions/userAction';
import useReset from '../../hooks/useReset';

type showType = {
  show: boolean;
};

const ButtonContainer = styled.View`
  margin-top: 25px;
  height: 130px;
  justify-content: space-between;
`;

const InputContainer = styled.View`
  margin-top: 10px;
  display: ${(props: showType) => (props.show ? 'flex' : 'none')};
`;

const NextContainer = styled.View`
  display: ${(props: showType) => (props.show ? 'flex' : 'none')};
`;

const schema = yup.object({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    .required(),
});

export default function GetStarted_1() {
  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const reset = useReset({ screenName: 'User' });

  const [show, setshow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const clearErrorMessage = () => setErrorMessage('');

  const dispatch = useDispatch();
  const checkNewUser = () => {
    axios
      .get(`${ASSIST_SERVER_URL}/user/check?email=${String(getValues('email'))}`)
      .then(({ data: { check: newUser, name, phone } }) => {
        if (newUser) {
          dispatch(addGetStarted({ email: String(getValues('email')) }));
          navigation.navigate('GetStarted_2');
        } else {
          navigation.navigate('GetStarted_Login', {
            email: String(getValues('email')),
            name: String(name),
            phone: String(phone),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const loginKakao = async () => {
    try {
      await Linking.openURL(`${ASSIST_SERVER_URL}/user/kakao`);
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>????????? ??? ????????????</Bold>
            <Light size={22}>???</Light>
          </>
          <Light size={22}>???????????????.</Light>
        </MainTitle>
        <ButtonContainer>
          <KakaoButton
            text="???????????? 1????????? ????????????"
            isKakao
            onPress={async () => {
              await loginKakao();
            }}
          />
          <KakaoButton
            text={show ? '????????? ????????? ??????' : '???????????? ????????????'}
            isKakao={false}
            transparent
            onPress={() => setshow(!show)}
          />
        </ButtonContainer>
        <InputContainer show={show}>
          <LineInput
            control={control}
            title="?????????"
            name="email"
            placeholder="???????????? ??????????????????"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
            conditions={[
              {
                name: '?????????',
                regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/,
              },
              {
                name: '????????? ??????(@)',
                regex: /@/,
              },
              {
                name: '????????? ?????????',
                regex:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
            ]}
          />
        </InputContainer>
      </NextPageView>
      <NextContainer show={show}>
        <NextButton disabled={!isValid || Boolean(errorMessage)} onPress={() => checkNewUser()} />
      </NextContainer>
    </>
  );
}
