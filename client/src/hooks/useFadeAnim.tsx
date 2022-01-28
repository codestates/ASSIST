import { useRef } from 'react';
import { Animated } from 'react-native';

type useFadeAnimProps = {
  duration: number;
};

export default function useFadeAnim({ duration }: useFadeAnimProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start();
  };

  return { fadeAnim, fadeIn, fadeOut };
}
