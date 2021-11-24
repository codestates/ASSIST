import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import LoggedInHeader from '../components/header/LoggedInHeader';
import MyPage from '../screens/MyPage';
import BottomDrawer from '../components/drawer/BottomDrawer';

const HomeStack = createStackNavigator();

// 로그인 시, role에 따라 온보딩 페이지를 보여줄지 말지 결정
// 팀이 있으면, 첫번째 팀 페이지가 보이게 함
// 팀이 없다면, 팀 추가 페이지
// const getFirstScreen = () => {};

export default function LoggedInNav() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{
          header: () => <LoggedInHeader />,
        }}
        component={Home}
      />
      <HomeStack.Screen name="MyPage" component={MyPage} />
      <HomeStack.Screen
        name="Selector"
        component={BottomDrawer}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
