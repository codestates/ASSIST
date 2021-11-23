import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';

import Button from './src/components/CustomButton/index';
<<<<<<< HEAD
import LineInput from './src/components/CustomInput/LineInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
=======
import { colors, fonts } from './src/theme/index';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 5px;
`;
const Text = styled.Text`
  font-family: ${fonts.primary};
  font-size: 16px;
  text-align: center;
  color: #fff;
`;
>>>>>>> fc473ec27f99386f9dab4a7f95ecc302bdf1d35c

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: string) => {
    console.log(data);
  };

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="버튼"
        buttonColor="#006FAD"
        titleColor="#fff"
        buttonStyle={{ width: '100%', alignSelf: 'center' }}
        titleStyle={{ fontSize: 20 }}
        onPress={handleSubmit(onSubmit)}
      />
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
    </View>
=======
    <ThemeProvider theme={colors}>
      <Container>
        <StatusBar style="auto" />
        <Button
          onPress={() => console.log('good')}
          bgColor={colors.lightGray}
          bgWidth="100%"
          bgBorder={`1px solid ${colors.blue}`}>
          <Text>버튼</Text>
        </Button>
      </Container>
    </ThemeProvider>
>>>>>>> fc473ec27f99386f9dab4a7f95ecc302bdf1d35c
  );
}
