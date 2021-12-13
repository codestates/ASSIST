import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import LandingPage_1 from '../screens/landing-page/LandingPage_1';
import LandingPage_2 from '../screens/landing-page/LandingPage_2';
import LandingPage_3 from '../screens/landing-page/LandingPage_3';
import LandingPage_4 from '../screens/landing-page/LandingPage_4';
import LandingPage_5 from '../screens/landing-page/LandingPage_5';
import LandingPage_6 from '../screens/landing-page/LandingPage_6';
import LandingPage_7 from '../screens/landing-page/LandingPage_7';
import LandingPage_8 from '../screens/landing-page/LandingPage_8';

const LandingPage = createStackNavigator();

export default function LandingPageNav() {
  return (
    <LandingPage.Navigator>
      <LandingPage.Screen
        name="LandingPage_1"
        options={{
          header: () => <DotsHeader isLanding current={1} total={7} />,
        }}
        component={LandingPage_1}
      />
      <LandingPage.Screen
        name="LandingPage_2"
        options={{
          header: () => <DotsHeader isLanding current={2} total={7} />,
        }}
        component={LandingPage_2}
      />
      <LandingPage.Screen
        name="LandingPage_3"
        options={{
          header: () => <DotsHeader isLanding current={3} total={7} />,
        }}
        component={LandingPage_3}
      />
      <LandingPage.Screen
        name="LandingPage_4"
        options={{
          header: () => <DotsHeader isLanding current={4} total={7} />,
        }}
        component={LandingPage_4}
      />
      <LandingPage.Screen
        name="LandingPage_5"
        options={{
          header: () => <DotsHeader isLanding current={5} total={7} />,
        }}
        component={LandingPage_5}
      />
      <LandingPage.Screen
        name="LandingPage_6"
        options={{
          header: () => <DotsHeader isLanding current={6} total={7} />,
        }}
        component={LandingPage_6}
      />
      <LandingPage.Screen
        name="LandingPage_7"
        options={{
          header: () => <DotsHeader isLanding current={7} total={7} />,
        }}
        component={LandingPage_7}
      />
      <LandingPage.Screen
        name="LandingPage_8"
        options={{
          header: () => <DotsHeader current={0} total={0} />,
        }}
        component={LandingPage_8}
      />
    </LandingPage.Navigator>
  );
}
