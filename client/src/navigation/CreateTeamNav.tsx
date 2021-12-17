import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import CreateTeam_1 from '../screens/create-team/CreateTeam_1';
import CreateTeam_2 from '../screens/create-team/CreateTeam_2';
import CreateTeam_3 from '../screens/create-team/CreateTeam_3';
import CreateTeam_4 from '../screens/create-team/CreateTeam_4';
import BankSelect from '../screens/drawer-select/BankSelect';
import CreateTeam_6 from '../screens/create-team/CreateTeam_6';
import CreateTeam_5 from '../screens/create-team/CreateTeam_5';
import CreateTeam_main from '../screens/create-team/CreateTeam_main';
import LoggedInHeader from '../components/header/LoggedInHeader';

const CreateTeam = createStackNavigator();

export default function CreateTeamNav() {
  return (
    <CreateTeam.Navigator>
      <CreateTeam.Screen
        name="CreateTeam_main"
        options={{
          header: () => <LoggedInHeader />,
        }}
        component={CreateTeam_main}
      />
      <CreateTeam.Screen
        name="CreateTeam_1"
        options={{
          header: () => <DotsHeader current={1} total={4} />,
        }}
        component={CreateTeam_1}
      />
      <CreateTeam.Screen
        name="CreateTeam_2"
        options={{
          header: () => <DotsHeader current={2} total={4} />,
        }}
        component={CreateTeam_2}
      />
      <CreateTeam.Screen
        name="CreateTeam_3"
        options={{
          header: () => <DotsHeader current={3} total={4} />,
        }}
        component={CreateTeam_3}
      />
      <CreateTeam.Screen
        name="CreateTeam_4"
        options={{
          header: () => <DotsHeader current={4} total={4} />,
        }}
        component={CreateTeam_4}
      />
      <CreateTeam.Screen
        name="CreateTeam_5"
        options={{
          header: () => <DotsHeader current={0} total={0} />,
        }}
        component={CreateTeam_5}
      />
      <CreateTeam.Screen
        name="CreateTeam_6"
        options={{
          headerShown: false,
        }}
        component={CreateTeam_6}
      />
      <CreateTeam.Screen
        name="BankSelect"
        component={BankSelect}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
      />
    </CreateTeam.Navigator>
  );
}
