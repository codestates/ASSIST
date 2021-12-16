import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParamList';

export default function useGoHome() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }],
      }),
    );
}
