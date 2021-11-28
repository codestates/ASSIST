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
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleLeftButton = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
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
  flex: 1;
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

export default function LendingPage_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LendingPageView>
      <HeaderSpaceTitle />
      <MainTitle>
        <TitleContainer>
          <TitleLeftButton onPress={() => navigation.navigate('LendingPage_1')}>
            <AntDesign name="left" size={32} color={colors.lightGray} />
          </TitleLeftButton>
          <Title>
            <Light size={18}>어시스트로 경기 일정을 등록하면</Light>
            <Bold size={18}>팀원의 참석 여부를</Bold>
            <Light size={18}>손쉽게 확인 할 수 있어요</Light>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LendingPage_3')}>
            <AntDesign name="right" size={32} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <ImageContainer>
        <LendingImage source={require('../../assets/images/lending_2.png')} />
        <LendingCopyRight>Illustration by Storyset</LendingCopyRight>
      </ImageContainer>
    </LendingPageView>
  );
}
