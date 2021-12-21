import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import LandingPageNav from './src/navigation/LandingPageNav';
import * as Linking from 'expo-linking';
import { createStackNavigator } from '@react-navigation/stack';
import NotFound from './src/screens/main/NotFound';

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
        NotFound: '*',
      },
    },
  };

  const linking2 = {
    prefixes: [prefix],
  };
  const rootNavigator = createStackNavigator();

  return (
    <NavigationContainer linking={linking}>
      <rootNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <rootNavigator.Screen name="Guest" component={LoggedOutNav} />
        <rootNavigator.Screen name="Landing" component={LandingPageNav} />
        <rootNavigator.Screen name="User" component={LoggedInNav} />
        <rootNavigator.Screen name="NotFound" component={NotFound} />
      </rootNavigator.Navigator>
    </NavigationContainer>
  );
}
