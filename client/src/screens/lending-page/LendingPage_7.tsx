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

const TitleSpaceTitle = styled.View`
  width: 100%;
  height: 3px;
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

export default function LendingPage_7() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LendingPageView>
      <HeaderSpaceTitle />
      <MainTitle>
        <TitleContainer>
          <TitleLeftButton onPress={() => navigation.navigate('LendingPage_6')}>
            <AntDesign name="left" size={32} color={colors.lightGray} />
          </TitleLeftButton>
          <Title>
            <Bold size={18}>복잡한 팀 관리,</Bold>
            <TitleSpaceTitle />
            <Light size={18}>이제 저희 어시스트 해 드릴게요!</Light>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LendingPage_8')}>
            <AntDesign name="right" size={32} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <ImageContainer>
        <LendingImage source={require('../../assets/images/lending_7.png')} />
        <LendingCopyRight>Illustration by Storyset</LendingCopyRight>
      </ImageContainer>
    </LendingPageView>
  );
}
