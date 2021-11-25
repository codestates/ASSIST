import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import CreateTeamOne from '../screens/create-team/CreateTeamOne';
import CreateTeamTwo from '../screens/create-team/CreateTeamTwo';
import CreateTeamThree from '../screens/create-team/CreateTeamThree';
import CreateTeamFour from '../screens/create-team/CreateTeamFour';
import CreateTeamEnd from '../screens/create-team/CreateTeamEnd';

const CreateTeam = createStackNavigator();

export default function CreateTeamNav() {
  return (
    <CreateTeam.Navigator>
      <CreateTeam.Screen
        name="CreateTeamOne"
        options={{
          header: () => <DotsHeader current={1} total={4} />,
        }}
        component={CreateTeamOne}
      />
      <CreateTeam.Screen
        name="CreateTeamTwo"
        options={{
          header: () => <DotsHeader current={2} total={4} />,
        }}
        component={CreateTeamTwo}
      />
      <CreateTeam.Screen
        name="CreateTeamThree"
        options={{
          header: () => <DotsHeader current={3} total={4} />,
        }}
        component={CreateTeamThree}
      />
      <CreateTeam.Screen
        name="CreateTeamFour"
        options={{
          header: () => <DotsHeader current={4} total={4} />,
        }}
        component={CreateTeamFour}
      />
      <CreateTeam.Screen
        name="CreateTeamEnd"
        options={{
          headerShown: false,
        }}
        component={CreateTeamEnd}
      />
    </CreateTeam.Navigator>
  );
}
