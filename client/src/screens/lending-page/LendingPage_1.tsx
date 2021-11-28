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
  height: 64px;
`;

const TitleContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleLeftButtonSpace = styled.View`
  flex: 1;
`;

const Title = styled.View`
  flex: 6;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleRightButton = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

const ImageContainer = styled.View`
  flex: 6;
  align-items: center;
  margin-bottom: 5px;
`;

const LendingImage = styled.Image`
  width: 100%;
  height: 62%;
  align-items: center;
`;

const LendingCopyRight = styled(Light)`
  font-size: 18px;
  color: ${colors.lightGray};
`;

export default function LendingPage_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LendingPageView>
      <HeaderSpaceTitle />
      <MainTitle>
        <TitleContainer>
          <TitleLeftButtonSpace />
          <Title>
            <Light size={18}>어시스트는 </Light>
            <Bold size={18}>편리한 풋살 팀 관리 도우미</Bold>
            <Light size={18}>서비스 입니다</Light>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LendingPage_2')}>
            <AntDesign name="right" size={32} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <ImageContainer>
        <LendingImage source={require('../../assets/images/lending_1.png')} />
        <LendingCopyRight>Illustration by Storyset</LendingCopyRight>
      </ImageContainer>
    </LendingPageView>
  );
}
