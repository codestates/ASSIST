import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useState } from 'react';
import { RootStackParamList } from '../navigation/RootStackParamList';

export default function useLineSelect() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isPressed, setIsPressed] = useState(false);

  const focusOff = useCallback(() => {
    isPressed && setIsPressed(false);
  }, [isPressed]);

  const onPress = () => setIsPressed(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      focusOff();
    });
    return unsubscribe;
  }, [navigation, focusOff]);

  return { isPressed, onPress };
}
