import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoggedOutHeader from '../components/header/LoggedOutHeader';
import Lobby from '../screens/main/Lobby';
import GetStartedNav from './GetStartedNav';
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { getAccessToken, getUserInfo, UserInfoType } from '../store/actions/userAction';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './RootStackParamList';
import { ASSIST_SERVER_URL } from '@env';
const LobbyStack = createStackNavigator();

export default function LoggedOutNav() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('accessToken');
    if (token) {
      const requestUserInfo = () => {
        axios
          .get(`${ASSIST_SERVER_URL}/user`, {
            headers: { authorization: `Bearer ${String(token)}` },
          })
          .then(({ data }: AxiosResponse<UserInfoType>) => {
            dispatch(getUserInfo(data));
            dispatch(getAccessToken(String(token)));
            // navigation.navigate('Home');
          })
          .catch((error) => console.log(error));
      };
      requestUserInfo();
    }
  }, []);

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
