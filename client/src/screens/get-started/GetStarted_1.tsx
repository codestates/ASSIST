import React, { useState } from 'react';
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
import { getAccessToken } from '../../store/actions/userAction';
import axios from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import * as Linking from 'expo-linking';

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

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>로그인 및 회원가입</Bold>
            <Light size={22}>을</Light>
          </>
          <Light size={22}>시작합니다.</Light>
        </MainTitle>
        <ButtonContainer>
          <KakaoButton
            text="카카오로 1초만에 시작하기"
            isKakao
            onPress={() => {
              Linking.openURL('http://localhost/user/kakao');
              // window.location.href = 'http://localhost/user/kakao';
            }}
          />
          <KakaoButton
            text={show ? '이메일 입력창 닫기' : '이메일로 시작하기'}
            isKakao={false}
            transparent
            onPress={() => setshow(!show)}
          />
        </ButtonContainer>
        <InputContainer show={show}>
          <LineInput
            control={control}
            title="이메일"
            name="email"
            placeholder="이메일을 입력해주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
            conditions={[
              {
                name: '아이디',
                regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@/,
              },
              {
                name: '골뱅이 기호(@)',
                regex: /@/,
              },
              {
                name: '올바른 도메인',
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
