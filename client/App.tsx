/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { fontsToLoad } from './src/assets/assets';
import { imagesToLoad } from './src/assets/assets';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';

import { colors } from './src/theme/colors';
import { Regular } from './src/theme/fonts';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import CommonModal from './src/components/modal/CommonModal';
import CommonButton from './src/components/button/CommonButton';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Regular)`
  font-size: 12px;
  color: ${colors.blue};
`;

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedin] = useState(true);

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

  const handleClick = () => {
    console.log('hello world');
  };

  if (loading) {
    return <AppLoading startAsync={preload} onError={console.warn} onFinish={onFinish} />;
  }

  return (
    // <NavigationContainer>{isLoggedin ? <LoggedInNav /> : <LoggedOutNav />}</NavigationContainer>
    <Container>
      <CommonButton
        onPress={handleClick}
        type="medium"
        buttonBorder={colors.blue}
        buttonBgColor={colors.white}>
        <ButtonText>버튼</ButtonText>
      </CommonButton>
    </Container>
  );
}

export default App;
