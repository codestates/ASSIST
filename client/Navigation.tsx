/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NavigationContainer, Route } from '@react-navigation/native';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import * as Linking from 'expo-linking';
import { createStackNavigator } from '@react-navigation/stack';
import QuickTipsNav from './src/navigation/QuickTipsNav';
import IntroPageNav from './src/navigation/IntroPageNav';
import NotFound from './src/screens/main/NotFound';
import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import TeamTipsNav from './src/navigation/TeamTipsNav';

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
                ScheduleManage_4: 'ScheduleManage_4',
                StadiumSelect: 'StadiumSelect',
              },
            },
            AddOns_2: 'AddOns_2/:teamId',
            AddOns_1: 'AddOns_1',
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
      return Promise.reject(error.response);
    },
  );

  const rootNavigator = createStackNavigator();

  const formatter = (options?: Record<string, any>, route?: Route<string, object | undefined>) => {
    const name = route?.name && route.name.split('_')[0];
    if (Platform.OS !== 'web') {
      return 'ASSIST';
    } else if (name === 'Lobby' || name === 'Guest') {
      return '????????? ????????? ?????? ASSIST';
    } else if (name === 'GetStarted') {
      if (route?.name === 'GetStarted_Login') {
        return '????????? | ASSIST';
      } else if (route?.name === 'GetStarted' || route?.name === 'GetStarted_1') {
        return '???????????? | ASSIST';
      }
      return '???????????? | ASSIST';
    } else if (name === 'FindPassword') {
      return '???????????? ?????? | ASSIST';
    } else if (name === 'CreateOrJoin') {
      return '??? ?????? | ASSIST';
    } else if (name === 'TeamSelect') {
      return '??? ?????? | ASSIST';
    } else if (name === 'MyPage') {
      return '??????????????? | ASSIST';
    } else if (name === 'NewPhone') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'MyProfile') {
      return '??? ????????? | ASSIST';
    } else if (name === 'CustomerService') {
      return '???????????? | ASSIST';
    } else if (name === 'LogOutSelect') {
      return '???????????? | ASSIST';
    } else if (name === 'CreateTeam') {
      return '??? ?????? | ASSIST';
    } else if (name === 'ScheduleManage') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'CalendarSelect') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'BankSelect') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'TimeSelect') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'StadiumSelect') {
      return '????????? ?????? | ASSIST';
    } else if (name === 'VoteSelect') {
      return '???????????? | ASSIST';
    } else if (name === 'PaymentDaySelect') {
      return '????????? ?????? | ASSIST';
    } else if (name === 'ConfirmSelect') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'GenderSelect') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'CancelSelect') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'DeleteAccount') {
      return '???????????? | ASSIST';
    } else if (name === 'IntroPage') {
      return '????????? ?????? | ASSIST';
    } else if (name === 'NotFound') {
      return '404 Error | ASSIST';
    } else if (name === 'JoinTeam') {
      return '??? ?????? | ASSIST';
    } else if (name === 'MercenaryInvite') {
      return '?????? ?????? | ASSIST';
    } else if (name === 'QuickTips' || name === 'TeamTips') {
      return '?????? ?????? | ASSIST';
    } else if (route?.name === 'AddOns_1') {
      return '?????? ?????? ?????? | ASSIST';
    } else if (route?.name === 'AddOns_2') {
      return '??? ????????? | ASSIST';
    } else if (route?.name === 'AddOns_3') {
      return '??? ?????? | ASSIST';
    } else if (route?.name === 'AddOns_4') {
      return '?????? ?????? | ASSIST';
    } else if (route?.name === 'MatchVote_1') {
      return '?????? ?????? | ASSIST';
    } else if (route?.name === 'MatchVote_2') {
      return '?????? ?????? | ASSIST';
    } else if (route?.name === 'MatchVote_3') {
      return '?????? ?????? | ASSIST';
    } else if (route?.name === 'MatchVote_4') {
      return '?????? ?????? | ASSIST';
    } else if (route?.name === 'MatchVote_5') {
      return '?????? ?????? | ASSIST';
    } else if (route?.name === 'MatchVote_6') {
      return '?????? ?????? ?????? | ASSIST';
    }
    return 'ASSIST';
  };

  return (
    <NavigationContainer
      linking={linking}
      documentTitle={{
        formatter,
      }}>
      <rootNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <rootNavigator.Screen name="Guest" component={LoggedOutNav} />
        <rootNavigator.Screen name="Intro" component={IntroPageNav} />
        <rootNavigator.Screen name="QuickTips" component={QuickTipsNav} />
        <rootNavigator.Screen name="TeamTips" component={TeamTipsNav} />
        <rootNavigator.Screen name="User" component={LoggedInNav} />
        <rootNavigator.Screen name="NotFound" component={NotFound} />
      </rootNavigator.Navigator>
    </NavigationContainer>
  );
}
