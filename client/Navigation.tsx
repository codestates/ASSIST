import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducers';
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
              },
            },
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

  const { token, role } = useSelector((state: RootState) => state.userReducer);

  const rootNavigator = createStackNavigator();

  const getNavigator = () => {
    if (token.length > 0) {
      if (role.length === 0) {
        return <rootNavigator.Screen name="Landing" component={LandingPageNav} />;
      } else if (role === 'tips') {
        // 팁 보여주기
        return;
      } else if (role === 'complete') {
        return <rootNavigator.Screen name="User" component={LoggedInNav} />;
      }
    } else {
      return <rootNavigator.Screen name="Guest" component={LoggedOutNav} />;
    }
  };

  return (
    <NavigationContainer linking={linking}>
      <rootNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {getNavigator()}
        <rootNavigator.Screen name="NotFound" component={NotFound} />
      </rootNavigator.Navigator>
    </NavigationContainer>
  );
}
