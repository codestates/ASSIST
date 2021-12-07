import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducers';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';

export default function Navigation() {
  const { token } = useSelector((state: RootState) => state.userReducer);
  return (
    <NavigationContainer>
      {token.length > 0 ? <LoggedInNav /> : <LoggedOutNav />}
    </NavigationContainer>
  );
}
