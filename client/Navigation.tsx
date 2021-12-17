import React, { useEffect, useState } from 'react';
import {
  NavigationContainer,
  NavigationProp,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './src/store/reducers';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import LandingPageNav from './src/navigation/LandingPageNav';
import * as Linking from 'expo-linking';
import { createStackNavigator } from '@react-navigation/stack';

export default function Navigation() {
  const prefix = Linking.createURL('/');
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Landing: {
          path: 'Landing',
          screens: { Landing: 'LandingPage_1' },
        },
        User: {
          path: 'User',
          screens: {
            Team: 'Team/:teamId',
            MatchVote: {
              path: 'MatchVote/:matchId',
              screens: {
                MatchVote_main: 'MatchVote_main',
              },
            },
          },
        },
        Guest: {
          path: 'Guest',
          screens: { Lobby: 'Lobby' },
        },
      },
    },
  };

  const linking2: any = {
    prefixes: [prefix],
  };

  console.log(prefix);
  const { token, role } = useSelector((state: RootState) => state.userReducer);

  const rootNavigater = createStackNavigator();

  const getNavigator = () => {
    if (token.length > 0) {
      if (role.length === 0) {
        return <LandingPageNav />;
      } else if (role === 'tips') {
        // 팁 보여주기
        return;
      } else if (role === 'complete') {
        return <LoggedInNav />;
      }
    } else {
      return <LoggedOutNav />;
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <rootNavigater.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'User'}>
        {/* <rootNavigater.Screen name="Landing" component={LandingPageNav} /> */}
        <rootNavigater.Screen name="User" component={LoggedInNav} />
        <rootNavigater.Screen name="Guest" component={LoggedOutNav} />
      </rootNavigater.Navigator>
    </NavigationContainer>
  );
}
