import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParamList';

type useMatchVoteProps = { matchId?: number };

export default function useMatchVote({ matchId }: useMatchVoteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'MatchVote', params: { matchId } }],
      }),
    );
}
