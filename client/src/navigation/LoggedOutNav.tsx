import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoggedOutHeader from '../components/header/LoggedOutHeader';
import Lobby from '../screens/Lobby';

const LobbyStack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <LobbyStack.Navigator>
      <LobbyStack.Screen
        name="Lobby"
        options={{
          header: () => <LoggedOutHeader />,
        }}
        component={Lobby}
      />
    </LobbyStack.Navigator>
  );
}
