import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import VotePercentCard from '../../components/card/VotePercentCard';
import VoteStatusCard from '../../components/card/VoteStatueCard';

const PercentBarSpace = styled.View`
  width: 1%;
  height: 100%;
`;

const BarSpaceContent = styled.View`
  width: 100%;
  height: 32px;
`;

const CardSpaceCard = styled.View`
  width: 100%;
  height: 16px;
  background-color: ${colors.whiteSmoke};
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const VotePercentBar = styled.View`
  width: 100%;
  height: 16px;
  flex-direction: row;
`;

const VoteAttend = styled.View`
  width: 46%;
  background-color: ${colors.blue};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;
const VoteNonAttend = styled.View`
  width: 30%;
  background-color: ${colors.darkGray};
`;
const VoteUndefined = styled.View`
  width: 10%;
  background-color: ${colors.gray};
`;
const VoteNonResponse = styled.View`
  width: 10%;
  background-color: ${colors.lightGray};
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const VotePercentContents = styled.View`
  height: 180px;
  padding-horizontal: 20px;
  margin-bottom: 32px;
`;

const VoteStatusCardContainer = styled.View``;

export default function MatchVote_6() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  return (
    <>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>참석 투표 현황</Bold>
          <Regular size={17}>2021-08-18 (수) 18:00 → 20:00</Regular>
        </MainTitle>
        <ContentContainer>
          <VotePercentBar>
            <VoteAttend />
            <PercentBarSpace />
            <VoteNonAttend />
            <PercentBarSpace />
            <VoteUndefined />
            <PercentBarSpace />
            <VoteNonResponse />
          </VotePercentBar>
          <BarSpaceContent />
          <VotePercentContents>
            <VotePercentCard blockColor={colors.blue} title="참석" person={14} percent="30.28" />
            <VotePercentCard blockColor={colors.darkGray} title="불참" person={7} percent="15.22" />
            <VotePercentCard blockColor={colors.gray} title="미정" person={5} percent="8.88" />
            <VotePercentCard
              blockColor={colors.lightGray}
              title="미응답"
              person={5}
              percent="8.88"
            />
          </VotePercentContents>
          <CardSpaceCard />
          <VoteStatusCard title="참석" person={14} name="홍길동" />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
