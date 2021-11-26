import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import MainTitle from '../../components/text/MainTitle';
import NextPageView from '../../components/view/NextPageView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { BoldText, LightText } from '../../components/text/SharedText';
import SkipButton from '../../components/button/SkipButton';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import KakaoButton from '../../components/button/KakaoButton';

const CodeContainer = styled.TouchableOpacity`
  width: 100%;
  height: 90px;
  padding: 10px 12px 10px 8px;
  background-color: ${colors.whiteSmoke};
  margin-top: 70px;
  justify-content: space-between;
`;

const CodeTitle = styled(Regular)`
  color: ${colors.darkGray};
`;

const FlexBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  margin-top: 50px;
  height: 130px;
  justify-content: space-between;
`;

export default function CreateTeam_5() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <NextPageView>
        <MainTitle>
          <LightText>팀원을</LightText>
          <BoldText>초대 할 차례에요 📩</BoldText>
        </MainTitle>
        <CodeContainer>
          <CodeTitle>팀 초대 코드</CodeTitle>
          <FlexBox>
            <BoldText>AX95Q2</BoldText>
            <MaterialIcons name="content-copy" size={24} color={colors.lightGray} />
          </FlexBox>
        </CodeContainer>
        <ButtonContainer>
          <KakaoButton
            text="카카오톡으로 초대하기  >"
            isKakao
            onPress={() => console.log('clicked')}
          />
          <KakaoButton
            text="문자메시지로 초대하기  >"
            isKakao={false}
            onPress={() => console.log('clicked')}
          />
        </ButtonContainer>
      </NextPageView>
      <SkipButton text="다음에 초대할게요" onPress={() => navigation.navigate('CreateTeam_6')} />
    </>
  );
}
