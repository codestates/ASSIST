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

const MainTitleSpaceContents = styled.View`
  width: 100%;
  height: 50px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const CardSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const ButtonSpaceButton = styled.View`
  width: 100%;
  height: 8px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const MainTitleText = styled(Bold)`
  font-size: 22px;
  color: ${colors.white};
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 16px;
  color: ${colors.gray};
`;

const Vote = styled.TouchableOpacity`
  height: 60px;
  padding: 16px;
  border: 1px solid ${colors.lightGray};
  justify-content: center;
`;

export default function MatchVote_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  return (
    <>
      <CloseHeader color={colors.gray} />
      <ColoredScrollView isCard={true} titleColor={colors.gray}>
        <MainTitle marginBottom="15px">
          <MainTitleText size={22}>인원 모집 중 💬</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <Bold size={20}>경기 정보</Bold>
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
          <CardSpaceButton />
          <Vote>
            <Regular size={17}>😍 참석</Regular>
          </Vote>
          <ButtonSpaceButton />
          <Vote>
            <Regular size={17}>😭 불참</Regular>
          </Vote>
          <ButtonSpaceButton />
          <Vote>
            <Regular size={17}>😱 미정</Regular>
          </Vote>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
