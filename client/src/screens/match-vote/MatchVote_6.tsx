import React from 'react';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import CloseHeader from '../../components/header/CloseHeader';
import VotePercentCard from '../../components/card/VotePercentCard';
import VoteStatusCard from '../../components/card/VoteStatusCard';
import { StackScreenProps } from '@react-navigation/stack';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import LoadingView from '../../components/view/LoadingView';
import useMatchDetail from '../../hooks/useMatchDetail';
import { Dimensions } from 'react-native';
import { VoteChoice } from '../../../@types/global/types';

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
  margin: 25px;
`;

const VotePercentView = styled.View`
  flex-direction: row;
  height: 45px;
  margin-top: 40px;
  width: 100%;
`;

const CallTipView = styled.View`
  width: 100%;
  padding: 30px 16px 15px 16px;
`;

const getPercentColor = (status: VoteChoice) => {
  if (status === 'absent') return colors.darkGray;
  if (status === 'attend') return colors.blue;
  if (status === 'nonRes') return colors.lightGray;
  if (status === 'hold') return colors.gray;
};

type PercentViewProps = {
  width: number;
  status: VoteChoice;
  isFirst?: boolean;
  isLast?: boolean;
};

const PercentView = styled.View`
  flex: ${(props: PercentViewProps) => `${props.width}`};
  height: 45px;
  margin: 0px 3px;
  background-color: ${(props: PercentViewProps) => getPercentColor(props.status)};
  border-top-left-radius: ${(props: PercentViewProps) => (props.isFirst ? 10 : 0)}px;
  border-bottom-left-radius: ${(props: PercentViewProps) => (props.isFirst ? 10 : 0)}px;
  border-top-right-radius: ${(props: PercentViewProps) => (props.isLast ? 10 : 0)}px;
  border-bottom-right-radius: ${(props: PercentViewProps) => (props.isLast ? 10 : 0)}px;
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_6'>;

export default function MatchVote_6({ route }: MatchVoteProps) {
  const { data, isLoading } = useMatchDetail({ matchId: Number(route.params?.matchId) });

  if (isLoading || !data) return <LoadingView />;
  const { attend, absent, hold, nonRes, date, day, daypassing, startTime, endTime } = data;

  const voteUserNum = (userNum: number) => {
    const allUsersNum = attend.length + absent.length + hold.length + nonRes.length;
    return !allUsersNum ? 0 : Math.round((userNum / allUsersNum) * 100);
  };

  const attendPercent = voteUserNum(attend.length);
  const absentPercent = voteUserNum(absent.length);
  const holdPercent = voteUserNum(hold.length);
  const nonResPercent = voteUserNum(nonRes.length);

  return (
    <>
      <CloseHeader
        navigate={{ screenName: 'MatchVote_Main', params: { matchId: route.params?.matchId } }}
        color={colors.whiteSmoke}
      />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>참석 투표 현황</Bold>
          <Regular size={17}>
            {`${date} (${day}) ${startTime} ~ ${daypassing ? '익일 ' : ''}${endTime}`}
          </Regular>
        </MainTitle>
        <ContentContainer>
          <VotePercentView>
            {attendPercent > 0 && (
              <PercentView
                width={attendPercent}
                status="attend"
                isFirst
                isLast={!nonResPercent && !holdPercent && !absentPercent}
              />
            )}
            {absentPercent > 0 && (
              <PercentView
                width={absentPercent}
                status="absent"
                isFirst={!attendPercent}
                isLast={!holdPercent && !nonResPercent}
              />
            )}
            {holdPercent > 0 && (
              <PercentView
                width={holdPercent}
                status="hold"
                isFirst={!attendPercent && !absentPercent}
                isLast={!nonResPercent}
              />
            )}
            {nonResPercent > 0 && (
              <PercentView
                width={nonResPercent}
                status="nonRes"
                isFirst={!attendPercent && !absentPercent && !holdPercent}
                isLast
              />
            )}
          </VotePercentView>
          <VotePercentContents>
            <VotePercentCard
              blockColor={colors.blue}
              title="참석"
              person={attend.length}
              percent={attendPercent}
            />
            <VotePercentCard
              blockColor={colors.darkGray}
              title="불참"
              person={absent.length}
              percent={absentPercent}
            />
            <VotePercentCard
              blockColor={colors.gray}
              title="미정"
              person={hold.length}
              percent={holdPercent}
            />
            <VotePercentCard
              blockColor={colors.lightGray}
              title="미응답"
              person={nonRes.length}
              percent={nonResPercent}
            />
          </VotePercentContents>
          <CardSpaceCard />
          <CallTipView>
            <Regular size={14} gray>
              이름을 눌러 팀원에게 바로 전화할 수 있어요!
            </Regular>
          </CallTipView>
          <VoteStatusCard title="참석" data={attend} />
          <VoteStatusCard title="불참" data={absent} />
          <VoteStatusCard title="미정" data={hold} />
          <VoteStatusCard title="미응답" data={nonRes} />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
