import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducers';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import LandingPageNav from './src/navigation/LandingPageNav';

export default function Navigation() {
  const { token, role } = useSelector((state: RootState) => state.userReducer);

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

  return <NavigationContainer>{getNavigator()}</NavigationContainer>;
}
