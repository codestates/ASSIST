import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../screens/main/MyPage';
import CloseHeader from '../components/header/CloseHeader';
import NewPhoneNav from './NewPhoneNav';
import MyProfileNav from './MyProfileNav';
import FindPasswordNav from './FindPasswordNav';
import CustomerServiceNav from './CustomerServiceNav';
import LogOutSelect from '../screens/drawer-select/LogOutSelect';

const MyPageStack = createStackNavigator();

export default function MyPageNav() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPage_Main"
        options={{
          header: () => <CloseHeader />,
        }}
        component={MyPage}
      />
      <MyPageStack.Screen
        name="NewPhone"
        options={{
          headerShown: false,
        }}
        component={NewPhoneNav}
      />
      <MyPageStack.Screen
        name="MyProfile"
        options={{
          headerShown: false,
        }}
        component={MyProfileNav}
      />
      <MyPageStack.Screen
        name="ChangePassword"
        options={{
          headerShown: false,
        }}
        component={FindPasswordNav}
      />
      <MyPageStack.Screen
        name="CustomerService"
        options={{
          headerShown: false,
        }}
        component={CustomerServiceNav}
      />
      <MyPageStack.Screen
        name="LogOutSelect"
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
        component={LogOutSelect}
      />
    </MyPageStack.Navigator>
  );
}
