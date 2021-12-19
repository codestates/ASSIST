import React from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LandingPageView from '../../components/view/LandingPageView';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import Landing_1 from '../../assets/images/Landing_1.png';
import { Dimensions } from 'react-native';

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleLeftButtonSpace = styled.View`
  flex: 1;
`;

const Title = styled.View`
  /* flex: 6; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleRightButton = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

const LandingImage = styled.Image`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const LandingCopyRight = styled(Light)`
  font-size: 14px;
  margin-bottom: 14px;
  color: ${colors.lightGray};
  align-self: center;
`;

const LightText = styled(Light)`
  margin-bottom: 5px;
`;

const BoldText = styled(Bold)`
  margin-bottom: 5px;
`;

const FlexWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default function LandingPage_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LandingPageView>
      <MainTitle>
        <TitleContainer>
          <TitleLeftButtonSpace />
          <Title>
            <LightText>어시스트는 </LightText>
            <BoldText>편리한 풋살 팀 관리 도우미</BoldText>
            <Light>서비스 입니다</Light>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LandingPage_2')}>
            <AntDesign name="right" size={26} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <FlexWrapper>
        <LandingImage resizeMode={'contain'} source={Landing_1} />
      </FlexWrapper>
      <LandingCopyRight>Illustration by Storyset</LandingCopyRight>
    </LandingPageView>
  );
}
