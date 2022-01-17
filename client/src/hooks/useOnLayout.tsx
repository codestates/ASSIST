import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { LayoutType } from '../../@types/global/types';

export default function useOnLayout() {
  const [layout, setLayout] = useState<undefined | LayoutType>(undefined);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setLayout(layout);
  }, []);

  return { layout, onLayout };
}
