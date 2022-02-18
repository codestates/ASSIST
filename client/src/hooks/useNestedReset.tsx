import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootStackParamList';

type useNestedResetProps = {
  index?: number;
  routes: {
    name: string;
    state: {
      routes: {
        name: string;
      }[];
    };
  }[];
};

export default function useNestedReset({ index, routes }: useNestedResetProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const reset = () => {
    navigation.dispatch({
      ...CommonActions.reset({
        index: index || 0,
        routes,
      }),
    });
  };

  return reset;
}
