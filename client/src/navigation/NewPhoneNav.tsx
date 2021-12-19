import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import NewPhone_1 from '../screens/new-phone/NewPhone_1';
import NewPhone_2 from '../screens/new-phone/NewPhone_2';

const NewPhone = createStackNavigator();

export default function NewPhoneNav() {
  return (
    <NewPhone.Navigator>
      <NewPhone.Screen
        name="NewPhone_1"
        options={{
          header: () => <DotsHeader current={1} total={2} />,
        }}
        component={NewPhone_1}
      />
      <NewPhone.Screen
        name="NewPhone_2"
        options={{
          header: () => <DotsHeader reset="NewPhone_1" current={2} total={2} />,
        }}
        component={NewPhone_2}
      />
    </NewPhone.Navigator>
  );
}
