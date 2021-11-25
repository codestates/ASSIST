/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

import styled from 'styled-components/native';

import LineInput from './src/components/input/CommonInput';
import CommonModal from './src/components/modal/CommonModal';
import { Bold } from './src/theme/fonts';

const StyledScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
}))``;

function App() {
  const [loading, setLoading] = useState(true);

  const preloadAssets = async () => {
    const fontToLoad = [
      { 'SpoqaHanSansNeo-Bold': require('./src/assets/fonts/SpoqaHanSansNeo-Bold.otf') },
      { 'SpoqaHanSansNeo-Light': require('./src/assets/fonts/SpoqaHanSansNeo-Light.otf') },
      { 'SpoqaHanSansNeo-Medium': require('./src/assets/fonts/SpoqaHanSansNeo-Medium.otf') },
      { 'SpoqaHanSansNeo-Regular': require('./src/assets/fonts/SpoqaHanSansNeo-Regular.otf') },
      { 'SpoqaHanSansNeo-Thin': require('./src/assets/fonts/SpoqaHanSansNeo-Thin.otf') },
    ];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require('./src/assets/images/big-logo.png'),
      require('./src/assets/images/small-logo.png'),
      require('./src/assets/images/font-logo.png'),
    ];
    const imagePromises = imagesToLoad.map((image: string | number | string[] | number[]) =>
      Asset.loadAsync(image),
    );
    await Promise.all<Promise<void> | Promise<Asset[]>>([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    return preloadAssets();
  };

  const onFinish = () => setLoading(false);

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const schema = yup.object({
    id: yup
      .string()
      .required('아이디는 필수입니다.')
      .typeError('영문을 포함해야 합니다.')
      .matches(/^.{4,14}$/s, '8 ~ 14자 사이여야 합니다.'),
    password: yup
      .string()
      .required('비밀번호는 필수입니다.')
      .matches(/^.{8,12}$/s, '8 ~ 13자 사이여야 합니다.')
      .matches(/^.*[a-zA-Z].*$/, '영문을 포함해야 합니다.')
      .matches(/\d/, '숫자를 포함해야 합니다.')
      .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, '특수문자를 포함해야 합니다.'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }

  return (
    <StyledScrollView>
      <StatusBar style="auto" />
      <LineInput
        control={control}
        name="id"
        title="아이디"
        placeholder="아이디를 입력해주세요"
        errorMessage={errors.id?.message}
        conditions={[
          { name: '4~14자', regex: /^.{4,14}$/s },
          { name: '영문', regex: /^.*[a-zA-Z].*$/ },
        ]}
      />
      <LineInput
        control={control}
        name="password"
        title="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        conditions={[
          { name: '8~13자', regex: /^.{8,13}$/s },
          { name: '영문', regex: /^.*[a-zA-Z].*$/ },
          { name: '숫자', regex: /\d/ },
          { name: '특수문자', regex: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/ },
        ]}
        secureTextEntry={true}
        errorMessage={errors.password?.message}
      />
      <CommonModal />
    </StyledScrollView>
  );
}

export default App;
