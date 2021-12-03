import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import LendingPageView from '../../components/view/LendingPageView';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import { colors } from '../../theme/colors';

const HeaderSpaceTitle = styled.View`
  width: 100%;
  height: 32px;
`;
const TitleSpaceTitle = styled.View`
  width: 100%;
  height: 20px;
`;

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleLeftButton = styled.TouchableOpacity`
  flex: 0.7;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 12px;
`;

const Title = styled.View`
  flex: 6;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-vertical: 2px;
`;

const TitleRightButton = styled.TouchableOpacity`
  flex: 0.5;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 12px;
`;

const ImageContainer = styled.View`
  flex: 1;
  position: relative;
  margin-bottom: 5px;
`;

const LendingImage = styled.Image`
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 15px;
  left: 0;
`;

export default function LendingPage_5() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LendingPageView>
      <HeaderSpaceTitle />
      <MainTitle>
        <TitleContainer>
          <TitleLeftButton onPress={() => navigation.navigate('LendingPage_4')}>
            <AntDesign name="left" size={32} color={colors.lightGray} />
          </TitleLeftButton>
          <Title>
            <Bold size={18}>3. 용병 초대</Bold>
            <TitleSpaceTitle />
            <Bold size={18}>
              경기 일정을 등록<Light size={18}> 해 보세요</Light>
            </Bold>
            <Bold size={17}>
              주변 플레이어를 용병으로 초대<Light size={17}> 해 보세요!</Light>
            </Bold>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LendingPage_6')}>
            <AntDesign name="right" size={32} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <ImageContainer>
        <LendingImage
          source={require('../../assets/images/lending_5.png')}
          resizeMode={'contain'}
        />
      </ImageContainer>
    </LendingPageView>
  );
}
