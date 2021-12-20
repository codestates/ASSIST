import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/RootStackParamList';
import { RootState } from '../store/reducers';

export default function useGoHome() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    selectedTeam: { id },
  } = useSelector((state: RootState) => state.userReducer);

  return () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Team', params: { teamId: id } }],
      }),
    );
}
