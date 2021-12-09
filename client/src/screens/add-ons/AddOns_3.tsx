import React, { useState, useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import NextButton from '../../components/button/NextButton';
import LineInput from '../../components/input/LineInput';
import LineSelect from '../../components/input/LineSelect';
import * as yup from 'yup';

const InputSpaceInput = styled.View`
  width: 100%;
  height: 35px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const schema = yup.object({
  date: yup
    .string()
    .matches(/^(0?[1-9]|[12][0-9]|3[01])$/)
    .required(),
  money: yup.string().required(),
  teamName: yup.string().required(),
  bankAccount: yup
    .string()
    .matches(/^^[0-9]+(-[0-9]+)+$$/)
    .required(),
});

type AddOnsProps = StackScreenProps<RootStackParamList, 'AddOns_3'>;

export default function AddOns_3({ route }: AddOnsProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');
  const onSubmit = (data: string) => {
    console.log(data);
  };

  const goToNext = () => {
    setIsPressed(true);
    navigation.navigate('BankSelect', { name: 'AddOns_3' });
  };

  return (
    <>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>팀 정보</Bold>
          <Regular size={17}>FC 살쾡이</Regular>
        </MainTitle>
        <ContentContainer>
          <LineInput
            name="teamName"
            control={control}
            title="팀 이름"
            placeholder="팀 이름을 입력 해 주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
          <InputSpaceInput />
          <LineInput
            name="date"
            type="date"
            control={control}
            title="팀 회비 납부일"
            placeholder="납부일을 입력 해 주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
            conditions={[
              {
                name: '숫자',
                regex: /^\d+$/,
              },
              {
                name: '1~31 사이',
                regex: /^(0?[1-9]|[12][0-9]|3[01])$/,
              },
            ]}
          />
          <InputSpaceInput />
          <LineInput
            name="money"
            type="money"
            control={control}
            title="월 회비 금액"
            placeholder="회비 금액을 입력 해 주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
          <InputSpaceInput />
          <LineSelect
            title="은행"
            isPressed={isPressed}
            selected={route.params?.bank}
            onPress={() => goToNext()}
          />
          <InputSpaceInput />
          <LineInput
            name="bankAccount"
            control={control}
            title="계좌번호"
            placeholder="계좌번호를 입력해주세요"
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
            conditions={[
              {
                name: '숫자, 하이픈(-)만 사용',
                regex: /^^[0-9]+(-[0-9]+)+$$/,
              },
            ]}
          />
          <InputSpaceInput />
        </ContentContainer>
      </ColoredScrollView>
      <NextButton
        disabled={!isValid || route.params?.bank === undefined || Boolean(errorMessage)}
        text="팀 정보 수정하기 >"
        onPress={() => {
          console.log('팀 정보');
        }}
      />
    </>
  );
}
