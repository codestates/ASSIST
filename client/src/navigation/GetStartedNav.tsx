import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted_1 from '../screens/get-started/GetStarted_1';
import DotsHeader from '../components/header/DotsHeader';
import GetStarted_2 from '../screens/get-started/GetStarted_2';
import GetStarted_3 from '../screens/get-started/GetStarted_3';
import GetStarted_4 from '../screens/get-started/GetStarted_4';
import GetStarted_5 from '../screens/get-started/GetStarted_5';
import GenderSelect from '../screens/drawer-select/GenderSelect';
import GetStarted_6 from '../screens/get-started/GetStarted_6';
import GetStarted_Login from '../screens/get-started/GetStarted_Login';
import FindPasswordNav from './FindPasswordNav';

const GetStartedStack = createStackNavigator();

export default function GetStartedNav() {
  return (
    <GetStartedStack.Navigator>
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
          header: () => <DotsHeader reset="GetStarted_2" current={3} total={4} />,
        }}
        component={GetStarted_4}
      />
      <GetStartedStack.Screen
        name="GetStarted_5"
        options={{
          header: () => <DotsHeader current={4} total={4} />,
        }}
        component={GetStarted_5}
      />
      <GetStartedStack.Screen
        name="GetStarted_6"
        options={{
          headerShown: false,
        }}
        component={GetStarted_6}
      />
      <GetStartedStack.Screen
        name="GenderSelect"
        component={GenderSelect}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
      />
      <GetStartedStack.Screen
        name="GetStarted_Login"
        options={{
          header: () => <DotsHeader current={0} total={0} />,
        }}
        component={GetStarted_Login}
      />
      <GetStartedStack.Screen
        name="FindPassword"
        options={{ headerShown: false }}
        component={FindPasswordNav}
      />
    </GetStartedStack.Navigator>
  );
}
