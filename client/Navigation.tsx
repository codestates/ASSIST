import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import * as Linking from 'expo-linking';
import { createStackNavigator } from '@react-navigation/stack';
import QuickTipsNav from './src/navigation/QuickTipsNav';
import IntroPageNav from './src/navigation/IntroPageNav';
import NotFound from './src/screens/main/NotFound';
import axios, { AxiosError } from 'axios';

export default function Navigation() {
  const prefix = Linking.createURL('/');
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Intro: {
          path: 'Intro',
          screens: { Intro: 'IntroPage_1' },
        },
        QuickTips: {
          path: 'QuickTips',
          screens: { QuickTips: 'QuickTips_1' },
        },
        User: {
          path: 'User',
          screens: {
            BankSelect: 'BankSelect',
            Team: 'Team/:teamId',
            MatchVote: {
              path: 'MatchVote/:matchId',
              screens: {
                MatchVote_Main: 'MatchVote_Main',
                MatchVote_6: 'MatchVote_6',
              },
            },
            JoinTeam: {
              path: 'JoinTeam',
              screens: {
                JoinTeam_1: 'JoinTeam_1/:inviteCode',
              },
            },
            ScheduleManage: {
              path: 'ScheduleManage',
              screens: {
                ScheduleManage_2: 'ScheduleManage_2',
                StadiumSelect: 'StadiumSelect',
              },
            },
            AddOns_2: 'AddOns_2/:teamId',
          },
        },
        Guest: {
          path: 'Guest',
          screens: { Lobby: 'Lobby' },
        },
        NotFound: {
          path: 'NotFound',
          screens: { NotFound: 'NotFound' },
        },
      },
    },
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 404) {
        await Linking.openURL('/NotFound');
      }
    },
  );

  const rootNavigator = createStackNavigator();

  return (
    <NavigationContainer linking={linking}>
      <rootNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <rootNavigator.Screen name="Guest" component={LoggedOutNav} />
        <rootNavigator.Screen name="Intro" component={IntroPageNav} />
        <rootNavigator.Screen name="QuickTips" component={QuickTipsNav} />
        <rootNavigator.Screen name="User" component={LoggedInNav} />
        <rootNavigator.Screen name="NotFound" component={NotFound} />
      </rootNavigator.Navigator>
    </NavigationContainer>
  );
}
