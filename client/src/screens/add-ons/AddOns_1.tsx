import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MainTitleSpaceContents = styled.View`
  width: 100%;
  height: 32px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const CardTitleContainer = styled.View`
  width: 100%;
  height: 20%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardTitleBox = styled.View`
  width: 25%;
  height: 100%;
  background-color: ${colors.blue};
  align-items: center;
  justify-content: center;
`;

const CardTitleText = styled(Regular)`
  font-size: 15px;
  color: ${colors.white};
`;

const CardTitleButtonBox = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: transparent;
`;

const CardTitleButtonText = styled(Regular)`
  font-size: 15px;
  color: ${colors.gray};
`;
const MatchInfoDetailStadium = styled(Regular)`
  font-size: 16px;
  color: ${colors.gray};
`;

export default function MatchVote_6() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const handleDetailVote = () => {
    navigation.navigate('MatchVote_6');
  };

  return (
    <>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView isCard={true} titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>지난 경기 기록</Bold>
          <Regular size={17}>FC 살쾡이</Regular>
        </MainTitle>
        <ContentContainer>
          <CardTitleContainer>
            <CardTitleBox>
              <CardTitleText>경기 완료</CardTitleText>
            </CardTitleBox>
            <CardTitleButtonBox onPress={handleDetailVote}>
              <CardTitleButtonText>자세히 보기</CardTitleButtonText>
            </CardTitleButtonBox>
          </CardTitleContainer>
          <MainTitleSpaceContents />
          <Regular size={17}>2021-08-18(수)</Regular>
          <TextSpaceText />
          <Bold size={20}>
            시작 18:00 <AntDesign name="arrowright" size={20} /> 20:00 종료
          </Bold>
          <TextSpaceText />
          <MatchInfoDetailStadium>서울 동대문구 천호대로 133</MatchInfoDetailStadium>
          <TextSpaceText />
          <MatchInfoDetailStadium>홈플러스 동대문점 옥상층 HM풋살파크</MatchInfoDetailStadium>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
