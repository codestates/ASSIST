import React from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import CloseHeader from '../../components/header/CloseHeader';
import VotePercentCard from '../../components/card/VotePercentCard';
import VoteStatusCard from '../../components/card/VoteStatueCard';
import { StackScreenProps } from '@react-navigation/stack';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LoadingView from '../../components/view/LoadingView';
import useMatchDetail from '../../hooks/useMatchDetail';
import { Dimensions } from 'react-native';

const BarSpaceContent = styled.View`
  width: 100%;
  height: 32px;
`;

const CardSpaceCard = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 16px;
  background-color: ${colors.whiteSmoke};
  align-self: center;
`;

const ContentContainer = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

const VotePercentContents = styled.View`
  height: 180px;
  padding: 0px 20px;
  margin-bottom: 32px;
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_6'>;

export default function MatchVote_6({ route }: MatchVoteProps) {
  const { data, isLoading } = useMatchDetail({ matchId: Number(route.params?.matchId) });

  const voteUserNum = (userNum: number) => {
    if (!data) return '0';
    const allUsersNum =
      data?.attend.length + data?.absent.length + data?.hold.length + data?.nonRes.length;
    return !allUsersNum ? '0' : `${Math.round((userNum / allUsersNum) * 100)}`;
  };

  return isLoading || !data ? (
    <LoadingView />
  ) : (
    <>
      <CloseHeader
        navigate={{ screenName: 'MatchVote_Main', params: { matchId: route.params?.matchId } }}
        color={colors.whiteSmoke}
      />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>참석 투표 현황</Bold>
          <Regular size={17}>
            {`${data.date} (${data.day}) ${data.startTime} ~ ${data.daypassing ? '익일 ' : ''}${
              data.endTime
            }`}
          </Regular>
        </MainTitle>
        <ContentContainer>
          <BarSpaceContent />
          <VotePercentContents>
            <VotePercentCard
              blockColor={colors.blue}
              title="참석"
              person={data.attend.length}
              percent={voteUserNum(data.attend.length)}
            />
            <VotePercentCard
              blockColor={colors.darkGray}
              title="불참"
              person={data.absent.length}
              percent={voteUserNum(data.absent.length)}
            />
            <VotePercentCard
              blockColor={colors.gray}
              title="미정"
              person={data.hold.length}
              percent={voteUserNum(data.hold.length)}
            />
            <VotePercentCard
              blockColor={colors.lightGray}
              title="미응답"
              person={data.nonRes.length}
              percent={voteUserNum(data.nonRes.length)}
            />
          </VotePercentContents>
          <CardSpaceCard />
          <VoteStatusCard title="참석" data={data.attend} />
          <VoteStatusCard title="불참" data={data.absent} />
          <VoteStatusCard title="미정" data={data.hold} />
          <VoteStatusCard title="미응답" data={data.nonRes} />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
