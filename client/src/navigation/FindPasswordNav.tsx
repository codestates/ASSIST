import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import FindPassword_1 from '../screens/find-password/FindPassword_1';
import FindPassword_2 from '../screens/find-password/FindPassword_2';

const FindPasswordStack = createStackNavigator();

export default function FindPasswordNav() {
  return (
    <FindPasswordStack.Navigator>
      <FindPasswordStack.Screen
        name="FindPassword_1"
        options={{
          header: () => <DotsHeader current={1} total={2} />,
        }}
        component={FindPassword_1}
      />
      <FindPasswordStack.Screen
        name="FindPassword_2"
        options={{
          header: () => <DotsHeader current={2} total={2} />,
        }}
        component={FindPassword_2}
      />
    </FindPasswordStack.Navigator>
  );
}
