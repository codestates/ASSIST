import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoggedOutHeader from '../components/header/LoggedOutHeader';
import Lobby from '../screens/main/Lobby';
import GetStartedNav from './GetStartedNav';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { getAccessToken, getUserInfo, UserInfoType } from '../store/actions/userAction';
import { ASSIST_SERVER_URL } from '@env';
import useReset from '../hooks/useReset';
import { Platform } from 'react-native';
import { RootState } from '../store/reducers/index.native';

const LobbyStack = createStackNavigator();

export default function LoggedOutNav() {
  const dispatch = useDispatch();
  const resetUser = useReset({ screenName: 'User' });
  const resetLanding = useReset({ screenName: 'Landing' });
  const resetTips = useReset({ screenName: 'QuickTips' });
  const { token, role } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    if (Platform.OS === 'web') {
      loginKakaoWeb();
    }
    if (token) {
      if (role === 'complete') {
        resetUser();
      } else if (role === 'tips') {
        resetTips();
      } else {
        resetLanding();
      }
    }
  }, []);

  const loginKakaoWeb = () => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('accessToken');
    if (token) {
      axios
        .get(`${ASSIST_SERVER_URL}/user`, {
          headers: { authorization: `Bearer ${String(token)}` },
        })
        .then(({ data }: AxiosResponse<UserInfoType>) => {
          dispatch(getUserInfo(data));
          dispatch(getAccessToken(String(token)));
          if (data.role === 'complete') {
            resetUser();
          } else if (data.role === 'tips') {
            // 팁으로 넘어가기
          } else {
            resetLanding();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <LobbyStack.Navigator>
      <LobbyStack.Screen
        name="Lobby"
        options={{
          header: () => <LoggedOutHeader />,
        }}
        component={Lobby}
      />
      <LobbyStack.Screen
        name="GetStarted"
        options={{
          headerShown: false,
        }}
        component={GetStartedNav}
      />
    </LobbyStack.Navigator>
  );
}
