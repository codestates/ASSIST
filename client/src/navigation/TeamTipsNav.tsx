import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TeamTips_1 from '../screens/team-tips/TeamTips_1';
import TeamTips_3 from '../screens/team-tips/TeamTips_3';
import TeamTips_2 from '../screens/team-tips/TeamTips_2';
import TeamTips_4 from '../screens/team-tips/TeamTips_4';
import TeamTips_5 from '../screens/team-tips/TeamTips_5';
import TeamTips_6 from '../screens/team-tips/TeamTips_6';

const TeamTips = createStackNavigator();

export default function TeamTipsNav() {
  return (
    <TeamTips.Navigator>
      <TeamTips.Screen
        name="TeamTips_1"
        options={{
          headerShown: false,
        }}
        component={TeamTips_1}
      />
      <TeamTips.Screen
        name="TeamTips_2"
        options={{
          headerShown: false,
        }}
        component={TeamTips_2}
      />
      <TeamTips.Screen
        name="TeamTips_3"
        options={{
          headerShown: false,
        }}
        component={TeamTips_3}
      />
      <TeamTips.Screen
        name="TeamTips_4"
        options={{
          headerShown: false,
        }}
        component={TeamTips_4}
      />
      <TeamTips.Screen
        name="TeamTips_5"
        options={{
          headerShown: false,
        }}
        component={TeamTips_5}
      />
      <TeamTips.Screen
        name="TeamTips_6"
        options={{
          headerShown: false,
        }}
        component={TeamTips_6}
      />
    </TeamTips.Navigator>
  );
}
