import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import DotsHeader from '../components/header/DotsHeader';
import FindPassword_1 from '../screens/find-password/FindPassword_1';
import FindPassword_2 from '../screens/find-password/FindPassword_2';
import { RootStackParamList } from './RootStackParamList';

const FindPasswordStack = createStackNavigator();
type FindPasswordProps = StackScreenProps<RootStackParamList, 'FindPassword'>;

export default function FindPasswordNav({ route }: FindPasswordProps) {
  return (
    <FindPasswordStack.Navigator>
      <FindPasswordStack.Screen
        name="FindPassword_1"
        options={{
          header: () => <DotsHeader current={1} total={2} />,
        }}
        initialParams={{ screenName: route.params?.screenName, phone: route.params?.phone }}
        component={FindPassword_1}
      />
      <FindPasswordStack.Screen
        name="FindPassword_2"
        options={{
          header: () => <DotsHeader reset="MyPage_Main" current={2} total={2} />,
        }}
        initialParams={{ screenName: route.params?.screenName, email: route.params?.email }}
        component={FindPassword_2}
      />
    </FindPasswordStack.Navigator>
  );
}
