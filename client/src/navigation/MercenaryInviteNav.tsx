import React from 'react';
import DotsHeader from '../components/header/DotsHeader';
import { createStackNavigator } from '@react-navigation/stack';
import MercenaryInvite_1 from '../screens/mercenary-invite/MercenaryInvite_1';
import MercenaryInvite_2 from '../screens/mercenary-invite/MercenaryInvite_2';
import MercenaryInvite_3 from '../screens/mercenary-invite/MercenaryInvite_3';
import MercenaryInvite_4 from '../screens/mercenary-invite/MercenaryInvite_4';
import MercenaryInvite_5 from '../screens/mercenary-invite/MercenaryInvite_5';

const MercenaryInvite = createStackNavigator();

export default function CreateTeamNav() {
  return (
    <MercenaryInvite.Navigator initialRouteName="MercenaryInvite_1">
      <MercenaryInvite.Screen
        name="MercenaryInvite_1"
        options={{
          headerShown: false,
        }}
        component={MercenaryInvite_1}
      />
      <MercenaryInvite.Screen
        name="MercenaryInvite_2"
        options={{
          header: () => <DotsHeader current={1} total={3} />,
        }}
        component={MercenaryInvite_2}
      />
      <MercenaryInvite.Screen
        name="MercenaryInvite_3"
        options={{
          header: () => <DotsHeader current={2} total={3} />,
        }}
        component={MercenaryInvite_3}
      />
      <MercenaryInvite.Screen
        name="MercenaryInvite_4"
        options={{
          header: () => <DotsHeader current={3} total={3} />,
        }}
        component={MercenaryInvite_4}
      />
      <MercenaryInvite.Screen
        name="MercenaryInvite_5"
        options={{
          headerShown: false,
        }}
        component={MercenaryInvite_5}
      />
    </MercenaryInvite.Navigator>
  );
}
