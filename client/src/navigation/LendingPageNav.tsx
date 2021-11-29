import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import LendingPage_1 from '../screens/lending-page/LendingPage_1';
import LendingPage_2 from '../screens/lending-page/LendingPage_2';
import LendingPage_3 from '../screens/lending-page/LendingPage_3';
import LendingPage_4 from '../screens/lending-page/LendingPage_4';
import LendingPage_5 from '../screens/lending-page/LendingPage_5';
import LendingPage_6 from '../screens/lending-page/LendingPage_6';
import LendingPage_7 from '../screens/lending-page/LendingPage_7';
import LendingPage_8 from '../screens/lending-page/LendingPage_8';

const LendingPage = createStackNavigator();

export default function LendingPageNav() {
  return (
    <LendingPage.Navigator>
      <LendingPage.Screen
        name="LendingPage_1"
        options={{
          header: () => <DotsHeader current={1} total={7} />,
        }}
        component={LendingPage_1}
      />
      <LendingPage.Screen
        name="LendingPage_2"
        options={{
          header: () => <DotsHeader current={2} total={7} />,
        }}
        component={LendingPage_2}
      />
      <LendingPage.Screen
        name="LendingPage_3"
        options={{
          header: () => <DotsHeader current={3} total={7} />,
        }}
        component={LendingPage_3}
      />
      <LendingPage.Screen
        name="LendingPage_4"
        options={{
          header: () => <DotsHeader current={4} total={7} />,
        }}
        component={LendingPage_4}
      />
      <LendingPage.Screen
        name="LendingPage_5"
        options={{
          header: () => <DotsHeader current={5} total={7} />,
        }}
        component={LendingPage_5}
      />
      <LendingPage.Screen
        name="LendingPage_6"
        options={{
          header: () => <DotsHeader current={6} total={7} />,
        }}
        component={LendingPage_6}
      />
      <LendingPage.Screen
        name="LendingPage_7"
        options={{
          header: () => <DotsHeader current={7} total={7} />,
        }}
        component={LendingPage_7}
      />
      <LendingPage.Screen
        name="LendingPage_8"
        options={{
          headerShown: false,
        }}
        component={LendingPage_8}
      />
    </LendingPage.Navigator>
  );
}
