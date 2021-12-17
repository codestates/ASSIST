import React from 'react';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import MatchVote_1 from '../screens/match-vote/MatchVote_1';
import MatchVote_2 from '../screens/match-vote/MatchVote_2';
import MatchVote_3 from '../screens/match-vote/MatchVote_3';
import MatchVote_6 from '../screens/match-vote/MatchVote_6';
import VoteSelect from '../screens/drawer-select/VoteSelect';
import MatchVote_4 from '../screens/match-vote/MatchVote_4';
import CancelSelect from '../screens/drawer-select/CancelSelect';
import ConfirmSelect from '../screens/drawer-select/ConfirmSelect';
import MatchVote_Main from '../screens/match-vote/MatchVote_Main';
import { RootStackParamList } from './RootStackParamList';

const MatchVote = createStackNavigator();
type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote'>;

export default function MatchVoteNav({ route }: MatchVoteProps) {
  return (
    <MatchVote.Navigator>
      <MatchVote.Screen
        name="MatchVote_Main"
        options={{
          headerShown: false,
        }}
        component={MatchVote_Main}
        initialParams={{ matchId: route.params?.matchId }}
      />
      <MatchVote.Screen
        name="MatchVote_1"
        options={{
          headerShown: false,
        }}
        component={MatchVote_1}
      />
      <MatchVote.Screen
        name="MatchVote_2"
        options={{
          headerShown: false,
        }}
        component={MatchVote_2}
      />
      <MatchVote.Screen
        name="MatchVote_3"
        options={{
          headerShown: false,
        }}
        component={MatchVote_3}
      />
      <MatchVote.Screen
        name="MatchVote_4"
        options={{
          headerShown: false,
        }}
        component={MatchVote_4}
      />
      <MatchVote.Screen
        name="VoteSelect"
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
        component={VoteSelect}
        initialParams={{ matchId: route.params?.matchId }}
      />
      <MatchVote.Screen
        name="CancelSelect"
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
        component={CancelSelect}
        initialParams={{ matchId: route.params?.matchId }}
      />
      <MatchVote.Screen
        name="ConfirmSelect"
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
        component={ConfirmSelect}
        initialParams={{ matchId: route.params?.matchId }}
      />
      <MatchVote.Screen
        name="MatchVote_6"
        options={{
          headerShown: false,
        }}
        component={MatchVote_6}
        initialParams={{ matchId: route.params?.matchId }}
      />
    </MatchVote.Navigator>
  );
}
