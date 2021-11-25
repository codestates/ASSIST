/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

import { colors } from './src/theme/colors';
import { Bold, Regular } from './src/theme/fonts';
import { fontsToLoad } from './src/assets/assets';
import { imagesToLoad } from './src/assets/assets';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import CommonModal from './src/components/modal/CommonModal';
import Triangle from './src/components/modal/TriangleContainer';
import Square from './src/components/modal/SquareContainer';
import CommonButton from './src/components/button/CommonButton';
import Card from './src/components/card/Card';

const Container = styled.View`
  flex: 1;
`;

const SquareContents = styled.View`
  width: 240px;
  height: 68px;
  margin-bottom: 16px;
`;

const Title = styled(Bold)`
  font-size: 14px;
  color: ${colors.white};
  padding-bottom: 8px;
`;

const Contents = styled(Regular)`
  font-size: 12px;
  color: ${colors.white};
`;

const BoldContent = styled(Bold)`
  font-size: 12px;
  color: ${colors.white};
`;

const SquareButton = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const ButtonPrevText = styled(Regular)`
  font-size: 12px;
  color: ${colors.white};
`;

const ButtonNextText = styled(Regular)`
  font-size: 12px;
  color: ${colors.darkGray};
`;

const Space = styled.View`
  width: 16px;
  height: 32px;
`;

const CardContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CardTitleContainer = styled.View`
  width: 224px;
  flex: 1;
`;

const CardTitle = styled(Bold)`
  font-size: 16px;
`;

const CardSpace = styled.View`
  width: 224px;
  flex: 1;
`;

const CardContentContainer = styled.View`
  width: 224px;
  flex: 4;
`;

const CardContentsDate = styled(Regular)`
  font-size: 14px;
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
      {/* <CommonModal animationType="fade">
        <Triangle direction="top" top="30%" left="40%" bgColor={colors.darkGray} />
        <Square top="33%" left="14.5%" bgColor={colors.darkGray}>
          <SquareContents>
            <Title>1. 팀등록하기</Title>
            <Contents>
              팀의 주장이라면 <BoldContent>[팀 등록하기]</BoldContent>를 눌러 어시스트에 팀을 등록
              해 주세요!
            </Contents>
          </SquareContents>
          <SquareButton>
            <CommonButton
              width="64px"
              height="32px"
              onPress={handleClick}
              buttonBorder={colors.white}
              buttonRadius="8px"
              buttonBgColor={colors.darkGray}>
              <ButtonPrevText>이전</ButtonPrevText>
            </CommonButton>
            <Space />
            <CommonButton
              width="64px"
              height="32px"
              onPress={handleClick}
              buttonBorder={colors.blue}
              buttonRadius="8px"
              buttonBgColor={colors.white}>
              <ButtonNextText>다음</ButtonNextText>
            </CommonButton>
          </SquareButton>
        </Square>
      </CommonModal> */}

      <CardContainer>
        <Card>
          <CardTitleContainer>
            <CardTitle>다음 경기</CardTitle>
          </CardTitleContainer>
          <CardSpace />
          <CardContentContainer>
            <CardContentsDate>2021-08-18(수)</CardContentsDate>
          </CardContentContainer>
        </Card>
      </CardContainer>
    </Container>
  );
}

export default App;
