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

const CardSpaceCard = styled.View`
  width: 100%;
  height: 35px;
`;

const ContentsSpaceContents = styled.View`
  width: 100%;
  height: 50px;
`;

const ButtonSpaceButton = styled.View`
  width: 100%;
  height: 8px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const MatchInfoContainer = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const MatchInfoTitle = styled.View`
  flex: 1;
`;

const Title = styled(Bold)`
  font-size: 22px;
  color: ${colors.white};
`;

const MatchInfoContents = styled.View`
  flex: 4;
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 17px;
  color: ${colors.gray};
`;

const VoteContainer = styled.View`
  flex: 1;
`;

const Vote = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  border: 1px solid ${colors.lightGray};
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
          <Title size={22}>인원 모집 중 💬</Title>
        </MainTitle>
        <ContentContainer>
          <MatchInfoContainer>
            <MatchInfoTitle>
              <Bold size={20}>경기 정보</Bold>
            </MatchInfoTitle>
            <ContentsSpaceContents />
            <MatchInfoContents>
              <Regular size={17}>2021-08-18(수)</Regular>
              <TextSpaceText />
              <Bold size={20}>
                시작 18:00 <AntDesign name="arrowright" size={20} /> 20:00 종료
              </Bold>
              <TextSpaceText />
              <MatchInfoDetailStadium>서울 동대문구 천호대로 133</MatchInfoDetailStadium>
              <TextSpaceText />
              <MatchInfoDetailStadium>홈플러스 동대문점 옥상층 HM풋살파크</MatchInfoDetailStadium>
            </MatchInfoContents>
          </MatchInfoContainer>
          <CardSpaceCard />
          <VoteContainer>
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
          </VoteContainer>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
