import React from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import KakaoButton from '../../components/button/KakaoButton';
import { Linking, Platform } from 'react-native';
import { CUSTOMER_SERVICE_NUMBER } from '@env';

const ContentContainer = styled.View`
  align-items: center;
  padding: 60px 30px;
`;

const DashedLine = styled.View`
  margin: 40px 0px;
  border: 0.8px;
  width: 100%;
  border-style: dashed;
  border-color: ${colors.lightGray};
`;

const TextContainer = styled.View`
  margin-bottom: 15px;
`;

const ButtonContainer = styled.View`
  padding: 0px 10px;
  width: 100%;
  height: 130px;
  justify-content: space-between;
`;

const CallButton = styled.TouchableOpacity`
  width: 100%;
  height: 55px;
  background-color: transparent;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border-width: 1.2px;
  border-color: ${colors.lightGray};
`;

export default function CustomerService_1() {
  const handlePhoneCall = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`tel://${CUSTOMER_SERVICE_NUMBER}`).catch((err) => console.log(err));
    } else {
      Linking.openURL(`tel:${CUSTOMER_SERVICE_NUMBER}`).catch((err) => console.log(err));
    }
  };

  return (
    <>
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="30px">
          <Bold size={24}>고객센터</Bold>
        </MainTitle>
        <ContentContainer>
          <TextContainer>
            <Bold size={17}>도움이 필요하신가요?</Bold>
          </TextContainer>
          <Regular gray size={14}>
            평일 09:00 - 18:00
          </Regular>
          <DashedLine />
          <ButtonContainer>
            <KakaoButton onPress={() => console.log('kakao')} text="카카오톡 상담  >" isKakao />
            <CallButton onPress={() => handlePhoneCall()}>
              <Regular gray>전화 상담 &gt;</Regular>
            </CallButton>
          </ButtonContainer>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
