import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CloseHeader from '../components/header/CloseHeader';
import NewPhoneNav from './NewPhoneNav';
import MyProfile_1 from '../screens/my-profile/MyProfile_1';
import { colors } from '../theme/colors';
import GenderSelect from '../screens/drawer-select/GenderSelect';

const MyProfile = createStackNavigator();

export default function MyProfileNav() {
  return (
    <MyProfile.Navigator>
      <MyProfile.Screen
        name="MyProfile_1"
        options={{
          header: () => <CloseHeader goBack color={colors.whiteSmoke} />,
        }}
        component={MyProfile_1}
      />
      <MyProfile.Screen
        name="NewPhone"
        options={{
          headerShown: false,
        }}
        component={NewPhoneNav}
      />
      <MyProfile.Screen
        name="GenderSelect"
        component={GenderSelect}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
      />
    </MyProfile.Navigator>
  );
}
