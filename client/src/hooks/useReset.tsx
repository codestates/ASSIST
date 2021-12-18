import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type useResetProps = {
  screenName: keyof RootStackParamList;
  params?: Readonly<object | undefined>;
};

export default function useReset({ screenName, params }: useResetProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return () => navigation.reset({ routes: [{ name: screenName, params }] });
}
