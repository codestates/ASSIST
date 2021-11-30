import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted_1 from '../screens/get-started/GetStarted_1';
import DotsHeader from '../components/header/DotsHeader';
import GetStarted_2 from '../screens/get-started/GetStarted_2';
import GetStarted_3 from '../screens/get-started/GetStarted_3';
import GetStarted_4 from '../screens/get-started/GetStarted_4';

const GetStartedStack = createStackNavigator();

export default function GetStartedNav() {
  return (
    <GetStartedStack.Navigator initialRouteName="GetStarted_4">
      <GetStartedStack.Screen
        name="GetStarted_1"
        options={{
          header: () => <DotsHeader current={0} total={0} />,
        }}
        component={GetStarted_1}
      />
      <GetStartedStack.Screen
        name="GetStarted_2"
        options={{
          header: () => <DotsHeader current={1} total={4} />,
        }}
        component={GetStarted_2}
      />
      <GetStartedStack.Screen
        name="GetStarted_3"
        options={{
          header: () => <DotsHeader current={2} total={4} />,
        }}
        component={GetStarted_3}
      />
      <GetStartedStack.Screen
        name="GetStarted_4"
        options={{
          header: () => <DotsHeader current={3} total={4} />,
        }}
        component={GetStarted_4}
      />
    </GetStartedStack.Navigator>
  );
}
