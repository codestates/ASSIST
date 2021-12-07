import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { fontsToLoad } from './src/assets/assets';
import { imagesToLoad } from './src/assets/assets';
import { ToastProvider } from 'react-native-toast-notifications';
import { colors } from './src/theme/colors';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import Navigation from './Navigation';

function App() {
  const [loading, setLoading] = useState(true);

  const onFinish = () => setLoading(false);
  const preloadAssets = async () => {
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagePromises = imagesToLoad.map((image: string | number | string[] | number[]) =>
      Asset.loadAsync(image),
    );
    await Promise.all<Promise<void> | Promise<Asset[]>>([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    return preloadAssets();
  };

  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastProvider duration={2500} normalColor={colors.darkGray}>
          <Navigation />
        </ToastProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
