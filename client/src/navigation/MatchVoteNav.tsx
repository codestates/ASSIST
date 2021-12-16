import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MatchVote_1 from '../screens/match-vote/MatchVote_1';
import MatchVote_2 from '../screens/match-vote/MatchVote_2';
import MatchVote_3 from '../screens/match-vote/MatchVote_3';
import MatchVote_6 from '../screens/match-vote/MatchVote_6';
import LoadingView from '../components/view/LoadingView';
import useNextMatch from '../hooks/useNextMatch';
import VoteSelect from '../screens/drawer-select/VoteSelect';
import MatchVote_4 from '../screens/match-vote/MatchVote_4';
// 경기 완료는 여기서 보여주는 것이 아님
import MatchVote_5 from '../screens/match-vote/MatchVote_5';
import CancelSelect from '../screens/drawer-select/CancelSelect';
import ConfirmSelect from '../screens/drawer-select/ConfirmSelect';

const MatchVote = createStackNavigator();

export default function MatchVoteNav() {
  const { isLoading, data } = useNextMatch();

  const getMatchVoteScreen = () => {
    if (data?.condition === '경기 확정') {
      // 경기 확정
      return (
        <MatchVote.Screen
          name="MatchVote_3"
          options={{
            headerShown: false,
          }}
          component={MatchVote_3}
        />
      );
    } else if (data?.condition === '인원 모집 중') {
      if (data?.vote) {
        // 투표 완료
        return (
          <MatchVote.Screen
            name="MatchVote_2"
            options={{
              headerShown: false,
            }}
            component={MatchVote_2}
          />
        );
      } else {
        // 인원 모집 중
        return (
          <MatchVote.Screen
            name="MatchVote_1"
            options={{
              headerShown: false,
            }}
            component={MatchVote_1}
          />
        );
      }
    } else if (data === null) {
      // 경기 취소
      return (
        <MatchVote.Screen
          name="MatchVote_4"
          options={{
            headerShown: false,
          }}
          component={MatchVote_4}
        />
      );
    }
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <MatchVote.Navigator>
      {getMatchVoteScreen()}
      {/* <MatchVote.Screen
        name="MatchVote_5"
        options={{
          headerShown: false,
        }}
        component={MatchVote_5}
      /> */}
      <MatchVote.Screen
        name="VoteSelect"
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
        component={VoteSelect}
      />
      <MatchVote.Screen
        name="CancelSelect"
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
        component={CancelSelect}
      />
      <MatchVote.Screen
        name="ConfirmSelect"
        options={{ presentation: 'transparentModal', cardOverlayEnabled: true, headerShown: false }}
        component={ConfirmSelect}
      />
      <MatchVote.Screen
        name="MatchVote_6"
        options={{
          headerShown: false,
        }}
        component={MatchVote_6}
      />
    </MatchVote.Navigator>
  );
}
