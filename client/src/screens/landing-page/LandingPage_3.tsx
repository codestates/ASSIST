import React from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LandingPageView from '../../components/view/LandingPageView';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import Landing_3 from '../../assets/images/Landing_3.png';
import { Dimensions } from 'react-native';

const TitleSpaceTitle = styled.View`
  width: 100%;
  height: 15px;
`;

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleLeftButton = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 14px;
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
  justify-content: flex-end;
  padding-bottom: 14px;
`;

const ImageContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: -${Dimensions.get('window').height / 3}px;
`;

const LandingImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Line = styled.View`
  margin-bottom: 5px;
`;

export default function LandingPage_3() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LandingPageView>
      <MainTitle>
        <TitleContainer>
          <TitleLeftButton onPress={() => navigation.navigate('LandingPage_2')}>
            <AntDesign name="left" size={26} color={colors.lightGray} />
          </TitleLeftButton>
          <Title>
            <Bold size={17}>1. 팀 등록</Bold>
            <TitleSpaceTitle />
            <Line>
              <Bold size={16}>
                팀을 등록<Light>하고,</Light>
              </Bold>
            </Line>
            <Bold>
              팀원을 초대 <Light>해 보세요!</Light>
            </Bold>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LandingPage_4')}>
            <AntDesign name="right" size={26} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <ImageContainer>
        <LandingImage source={Landing_3} resizeMode={'contain'} />
      </ImageContainer>
    </LandingPageView>
  );
}
