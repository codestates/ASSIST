import React from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LandingPageView from '../../components/view/LandingPageView';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import Landing_7 from '../../assets/images/Landing_7.png';
import { useWindowDimensions } from 'react-native';

const TitleContainer = styled.View`
  flex: 3;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.View`
  flex: 6;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleLeftButton = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

const TitleRightButton = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

const LandingImage = styled.Image`
  width: ${(props: { width: number }) => props.width}px;
  height: 100%;
`;

const LandingCopyRight = styled(Light)`
  font-size: 14px;
  margin-bottom: 14px;
  color: ${colors.lightGray};
  align-self: center;
`;

const BoldText = styled(Bold)`
  margin-bottom: 5px;
`;

const FlexWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default function LandingPage_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  return (
    <LandingPageView>
      <MainTitle>
        <TitleContainer>
          <TitleLeftButton onPress={() => navigation.navigate('LandingPage_6')}>
            <AntDesign name="left" size={26} color={colors.lightGray} />
          </TitleLeftButton>
          <Title>
            <BoldText>복잡한 팀 관리,</BoldText>
            <Light>이제 저희가 어시스트 해 드릴게요!</Light>
          </Title>
          <TitleRightButton onPress={() => navigation.navigate('LandingPage_8')}>
            <AntDesign name="right" size={26} color={colors.lightGray} />
          </TitleRightButton>
        </TitleContainer>
      </MainTitle>
      <FlexWrapper>
        <LandingImage resizeMode="contain" width={width} source={Landing_7} />
      </FlexWrapper>
      <LandingCopyRight>Illustration by Storyset</LandingCopyRight>
    </LandingPageView>
  );
}
