import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import Home from '../screens/main/Home';
import LoggedInHeader from '../components/header/LoggedInHeader';
import TeamSelect from '../screens/drawer-select/TeamSelect';

import CreateTeamNav from './CreateTeamNav';
import LandingPageNav from './LandingPageNav';
import JoinTeamNav from './JoinTeamNav';
import ScheduleManageNav from './ScheduleManageNav';
import MyPageNav from './MyPageNav';
import MatchVoteNav from './MatchVoteNav';
import MercenaryInvite from './MercenaryInviteNav';
import AddOns_1 from '../screens/add-ons/AddOns_1';
import AddOns_2 from '../screens/add-ons/AddOns_2';
import AddOns_3 from '../screens/add-ons/AddOns_3';
import AddOns_4 from '../screens/add-ons/AddOns_4';
import BankSelect from '../screens/drawer-select/BankSelect';
import SelectTeamHeader from '../components/header/SelectTeamHeader';
import CreateOrJoin from '../screens/main/CreateOrJoin';
import { RootStackParamList } from './RootStackParamList';

const HomeStack = createStackNavigator();
type UserProps = StackScreenProps<RootStackParamList, 'User'>;

export default function LoggedInNav({ route }: UserProps) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Team"
        options={{
          header: () => <LoggedInHeader />,
        }}
        initialParams={{ teamId: route.params?.teamId }}
        component={Home}
      />
      <HomeStack.Screen
        name="CreateOrJoin"
        options={{
          header: () => <SelectTeamHeader />,
        }}
        component={CreateOrJoin}
      />
      <HomeStack.Screen
        name="MyPage"
        component={MyPageNav}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TeamSelect"
        component={TeamSelect}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
      />
      <HomeStack.Screen
        name="CreateTeam"
        component={CreateTeamNav}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="LandingPage"
        component={LandingPageNav}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="JoinTeam" component={JoinTeamNav} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="ScheduleManage"
        component={ScheduleManageNav}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MatchVote"
        component={MatchVoteNav}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MercenaryInvite"
        component={MercenaryInvite}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="AddOns_1" component={AddOns_1} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddOns_2" component={AddOns_2} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddOns_3" component={AddOns_3} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddOns_4" component={AddOns_4} options={{ headerShown: false }} />

      <HomeStack.Screen
        name="BankSelect"
        component={BankSelect}
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
