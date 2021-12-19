import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import JoinTeam_1 from '../screens/join-team/JoinTeam_1';
import JoinTeam_2 from '../screens/join-team/JoinTeam_2';
import JoinTeam_3 from '../screens/join-team/JoinTeam_3';

const JoinTeam = createStackNavigator();

export default function JoinTeamNav() {
  return (
    <JoinTeam.Navigator>
      <JoinTeam.Screen
        name="JoinTeam_1"
        initialParams={{ inviteCode: '' }}
        options={{
          header: () => <DotsHeader reset="CreateOrJoin" current={1} total={2} />,
        }}
        component={JoinTeam_1}
      />
      <JoinTeam.Screen
        name="JoinTeam_2"
        options={{
          header: () => <DotsHeader current={2} total={2} />,
        }}
        component={JoinTeam_2}
      />
      <JoinTeam.Screen
        name="JoinTeam_3"
        options={{
          headerShown: false,
        }}
        component={JoinTeam_3}
      />
    </JoinTeam.Navigator>
  );
}
