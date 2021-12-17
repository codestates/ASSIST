import React from 'react';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import FinishPageView from '../../components/view/FinishPageView';
import { Bold, Light } from '../../theme/fonts';
import axios, { AxiosResponse } from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { ASSIST_SERVER_URL } from '@env';
import { useDispatch } from 'react-redux';
import { getAccessToken, getUserInfo, UserInfoType } from '../../store/actions/userAction';
import { useNavigation } from '@react-navigation/native';

type GetStartedProps = StackScreenProps<RootStackParamList, 'GetStarted_6'>;

export default function GetStarted_6({ route }: GetStartedProps) {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const requestUserInfo = () => {
    axios
      .get(`${ASSIST_SERVER_URL}/user`, {
        headers: { authorization: `Bearer ${String(route.params?.accessToken)}` },
      })
      .then(({ data }: AxiosResponse<UserInfoType>) => {
        dispatch(getUserInfo(data));
        dispatch(getAccessToken(String(route.params?.accessToken)));
        navigation.reset({
          routes: [
            {
              name: 'LandingPage',
            },
          ],
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <FinishPageView buttonText="어시스트 소개 보기  >" onPress={() => requestUserInfo()}>
      <>
        <Bold size={20}>회원 가입이 완료</Bold>
        <Light size={20}>되었어요!</Light>
      </>
    </FinishPageView>
  );
}
