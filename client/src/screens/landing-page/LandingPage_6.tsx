import React from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LandingPageView from '../../components/view/LandingPageView';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import Landing_6 from '../../assets/images/Landing_6.png';
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
  padding-bottom: 12px;
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
  padding-bottom: 12px;
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

export default function LandingPage_6() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <LandingPageView>
      <MainTitle>
        <TitleContainer>
          <TitleLeftButton onPress={() => navigation.navigate('LandingPage_5')}>
            <AntDesign name="left" size={26} color={colors.lightGray} />
          </TitleLeftButton>
          <Title>
            <Bold size={17}>4. 회비 관리</Bold>
            <TitleSpaceTitle />
            <Line>
              <Light>회비 챙기기 귀찮으셨죠?</Light>
            </Line>
            <Bold>
              납부 1일전<Light>에 알려드릴게요!</Light>
            </Bold>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LandingPage_7')}>
            <AntDesign name="right" size={26} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <ImageContainer>
        <LandingImage source={Landing_6} resizeMode={'contain'} />
      </ImageContainer>
    </LandingPageView>
  );
}
