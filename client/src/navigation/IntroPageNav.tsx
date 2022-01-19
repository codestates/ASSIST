import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroPage_1 from '../screens/intro-page/IntroPage_1';
import IntroPage_2 from '../screens/intro-page/IntroPage_2';
import IntroPage_3 from '../screens/intro-page/IntroPage_3';
import IntroPage_4 from '../screens/intro-page/IntroPage_4';
import IntroPage_5 from '../screens/intro-page/IntroPage_5';

const IntroPage = createStackNavigator();

export default function IntroPageNav() {
  return (
    <IntroPage.Navigator>
      <IntroPage.Screen
        name="IntroPage_1"
        options={{
          headerShown: false,
        }}
        component={IntroPage_1}
      />
      <IntroPage.Screen
        name="IntroPage_2"
        options={{
          headerShown: false,
        }}
        component={IntroPage_2}
      />
      <IntroPage.Screen
        name="IntroPage_3"
        options={{
          headerShown: false,
        }}
        component={IntroPage_3}
      />
      <IntroPage.Screen
        name="IntroPage_4"
        options={{
          headerShown: false,
        }}
        component={IntroPage_4}
      />
      <IntroPage.Screen
        name="IntroPage_5"
        options={{
          headerShown: false,
        }}
        component={IntroPage_5}
      />
    </IntroPage.Navigator>
  );
}
