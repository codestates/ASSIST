import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import LineInput from '../../components/input/LineInput';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Bold, Light, Regular } from '../../theme/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components/native';
import LineSelect from '../../components/input/LineSelect';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { colors } from '../../theme/colors';
import { Linking } from 'react-native';

const schema = yup.object({
  name: yup.string().required(),
});

const Seperator = styled.View`
  height: 15px;
`;

const Agreement = styled.View`
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  background-color: ${colors.white};
`;

const InfoText = styled(Regular)`
  color: ${colors.gray};
  font-size: 14px;
`;

const Linked = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${colors.gray};
`;

const Space = styled.View`
  height: 2px;
`;

type GetStartedProps = StackScreenProps<RootStackParamList, 'GetStarted_5'>;

export default function GetStarted_5({ route }: GetStartedProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    control,
    getValues,
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

  const goToNext = () => {
    setIsPressed(true);
    navigation.navigate('GenderSelect', { screenName: 'GetStarted_5' });
  };

  const { getStarted } = useSelector((state: RootState) => state.propsReducer);

  const requestSignUp = () => {
    axios
      .post(`${ASSIST_SERVER_URL}/user/signup`, {
        ...getStarted,
        name: String(getValues('name')),
        gender: route.params?.gender,
      })
      .then(({ data: { accessToken } }: AxiosResponse<{ accessToken: string }>) => {
        navigation.reset({ routes: [{ name: 'GetStarted_6', params: { accessToken } }] });
      })
      .catch((error) => console.log(error));
  };

  const onPressUsage = async () => {
    await Linking.openURL('https://foremost90.notion.site/2811a328d3564af39167d15e5804c699');
  };

  const onPressInfoSave = async () => {
    await Linking.openURL('https://foremost90.notion.site/b68388ea82e04b4d8c6b887622d5cfc3');
  };

  const onPressInfoProvide = async () => {
    await Linking.openURL('https://foremost90.notion.site/2c1179c0dc8f4aec89f4deb2c6ceb992');
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>프로필 정보</Bold>
            <Light size={22}>를</Light>
          </>
          <Light size={22}>입력해 주세요😀</Light>
        </MainTitle>
        <LineInput
          control={control}
          title="이름"
          name="name"
          placeholder="이름을 입력해주세요"
          errorMessage={errorMessage}
          clearErrorMessage={clearErrorMessage}
        />
        <Seperator />
        <LineSelect
          title="성별"
          isPressed={isPressed}
          onPress={() => goToNext()}
          selected={route.params?.gender}
        />
      </NextPageView>
      <Agreement>
        <InfoText>
          본인은 만 14세 이상이고,{' '}
          {
            <Linked onPress={onPressUsage}>
              <InfoText>이용약관</InfoText>
            </Linked>
          }
          ,{' '}
          {
            <Linked onPress={onPressInfoSave}>
              <InfoText>개인정보 수집 및 이용</InfoText>
            </Linked>
          }
          ,
        </InfoText>
        <Space />
        <InfoText>
          {
            <Linked onPress={onPressInfoProvide}>
              <InfoText>개인정보 제공내용</InfoText>
            </Linked>
          }
          을 확인하였으며, 동의합니다.
        </InfoText>
      </Agreement>
      <NextButton
        text="가입 완료"
        disabled={!isValid || route.params?.gender === undefined || Boolean(errorMessage)}
        onPress={() => requestSignUp()}
      />
    </>
  );
}
