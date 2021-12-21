import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { Bold, Medium, Regular } from '../../theme/fonts';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import { Dimensions, Platform } from 'react-native';
import LobbyImage from '../../assets/images/Lobby.png';
import SmallLogoGray from '../../assets/images/small-logo-gray.png';
import FontLogoGray from '../../assets/images/font-logo-gray.png';
import CommonButton from '../../components/button/CommonButton';

const Container = styled.ScrollView``;

const TopView = styled.View`
  height: ${Dimensions.get('window').height - (Platform.OS === 'web' ? 80 : 100)}px;
  background-color: ${colors.white};
  padding: ${Dimensions.get('window').height / 16}px ${Dimensions.get('window').width / 10}px;
`;

const BottomView = styled.View`
  height: auto;
  background-color: ${colors.whiteSmoke};
  padding: ${Dimensions.get('window').height / 8}px ${Dimensions.get('window').width / 10}px;
`;

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Title = styled(Bold)`
  margin-bottom: 5px;
`;

const SubTitle = styled(Regular)`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  opacity: 0.9;
  margin-bottom: 20px;
`;

const BoxLogo = styled.Image`
  width: 42px;
  height: 42px;
  margin-top: 10px;
`;

const FontLogo = styled.Image`
  width: 100px;
  height: 42px;
  margin-left: 12px;
`;

const LandingImage = styled.Image`
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 30px;
`;

const MemberContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
  flex-direction: row;
`;

const CopyRightContainer = styled.View`
  margin: 5px 0px;
`;

const Name = styled(Bold)`
  margin-right: 8px;
`;

const Space = styled.View`
  height: 15px;
`;

export default function Lobby() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <Container>
      <TopView>
        <LandingImage source={LobbyImage} resizeMode="contain" />
        <TextContainer>
          <Title size={25}>풋살 팀 관리가</Title>
          <Title size={25}>편리 해 집니다.</Title>
          <SubTitle size={17} gray>
            어시스트와 함께 시작 해 보세요.
          </SubTitle>
        </TextContainer>
        <CommonButton
          width="100%"
          height="52px"
          buttonBgColor={colors.blue}
          buttonRadius="30px"
          onPress={() => navigation.navigate('GetStarted')}>
          <Medium white>지금 시작하기</Medium>
        </CommonButton>
      </TopView>
      <BottomView>
        <LogoContainer>
          <BoxLogo source={SmallLogoGray} resizeMode="contain" />
          <FontLogo source={FontLogoGray} resizeMode="contain" />
        </LogoContainer>
        <MemberContainer>
          <Name gray>정관우</Name>
          <Regular gray size={14}>
            Front end
          </Regular>
        </MemberContainer>
        <MemberContainer>
          <Name gray>오민석</Name>
          <Regular gray size={14}>
            Front end
          </Regular>
        </MemberContainer>
        <MemberContainer>
          <Name gray>박상현</Name>
          <Regular gray size={14}>
            Back end
          </Regular>
        </MemberContainer>
        <MemberContainer>
          <Name gray>박형준</Name>
          <Regular gray size={14}>
            Product Manager
          </Regular>
        </MemberContainer>
        <Space />
        <CopyRightContainer>
          <Regular gray size={14}>
            Illustration by Storyset
          </Regular>
        </CopyRightContainer>
        <CopyRightContainer>
          <Regular gray size={14}>
            문의 : foremost90@gmail.com
          </Regular>
        </CopyRightContainer>
        <CopyRightContainer>
          <Bold gray size={14}>
            © 2021 ASSIST All right reserved.
          </Bold>
        </CopyRightContainer>
      </BottomView>
    </Container>
  );
}
