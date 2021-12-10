import { ASSIST_SERVER_URL } from '@env';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import React from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { getAccessToken, getUserInfo, UserInfoType } from '../store/actions/userAction';
import { RootState } from '../store/reducers';

type editProfileProps = {
  phone?: string;
  role?: string;
  password?: string;
  noNavigate?: boolean;
};

export default function useEditProfile({ phone, role, password, noNavigate }: editProfileProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const toast = useToast();
  const dispatch = useDispatch();
  return () =>
    axios
      .patch(
        `${ASSIST_SERVER_URL}/user`,
        { phone, role, password },
        { headers: { authorization: `Bearer ${token}` } },
      )
      .then(
        ({
          data: { user, accessToken },
        }: AxiosResponse<{ user: UserInfoType; accessToken: string }>) => {
          dispatch(getUserInfo(user));
          dispatch(getAccessToken(accessToken));
          if (phone) {
            toast.show('전화번호가 변경되었습니다.');
          } else if (password) {
            toast.show('비밀번호가 변경되었습니다.');
          }
          if (!noNavigate) {
            navigation.navigate('MyPage_Main');
          }
        },
      )
      .catch((error) => console.log(error));
}
