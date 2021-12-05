import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MatchVote_1 from '../screens/match-vote/MatchVote_1';
import MatchVote_2 from '../screens/match-vote/MatchVote_2';
import MatchVote_3 from '../screens/match-vote/MatchVote_3';
import MatchVote_4 from '../screens/match-vote/MatchVote_4';
import MatchVote_5 from '../screens/match-vote/MatchVote_5';

const MatchVote = createStackNavigator();

export default function CreateTeamNav() {
  return (
    <MatchVote.Navigator initialRouteName="MatchVote_2">
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
        name="MatchVote_5"
        options={{
          headerShown: false,
        }}
        component={MatchVote_5}
      />
    </MatchVote.Navigator>
  );
}
