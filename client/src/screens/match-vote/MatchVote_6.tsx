/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import CloseHeader from '../../components/header/CloseHeader';
import VotePercentCard from '../../components/card/VotePercentCard';
import VoteStatusCard from '../../components/card/VoteStatueCard';
import { StackScreenProps } from '@react-navigation/stack';
import { MatchDetail, NextMatch } from '../../../@types/global/types';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import { RootStackParamList } from '../../navigation/RootStackParamList';

// const PercentBarSpace = styled.View`
//   width: 1%;
//   height: 100%;
// `;

const BarSpaceContent = styled.View`
  width: 100%;
  height: 32px;
`;

const CardSpaceCard = styled.View`
  width: 100%;
  height: 16px;
  background-color: ${colors.whiteSmoke};
`;

const Space = styled.View`
  width: 100%;
  height: 35px;
`;

const ContentContainer = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

// const VotePercentBar = styled.View`
//   width: 100%;
//   height: 16px;
//   flex-direction: row;
// `;

// const VoteAttend = styled.View`
//   width: 46%;
//   background-color: ${colors.blue};
//   border-top-left-radius: 8px;
//   border-bottom-left-radius: 8px;
// `;
// const VoteNonAttend = styled.View`
//   width: 30%;
//   background-color: ${colors.darkGray};
// `;
// const VoteUndefined = styled.View`
//   width: 10%;
//   background-color: ${colors.gray};
// `;
// const VoteNonResponse = styled.View`
//   width: 10%;
//   background-color: ${colors.lightGray};
//   border-top-right-radius: 8px;
//   border-bottom-right-radius: 8px;
// `;

const VotePercentContents = styled.View`
  height: 180px;
  padding-horizontal: 20px;
  margin-bottom: 32px;
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_6'>;

export default function MatchVote_6({ route }: MatchVoteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token } = useSelector((state: RootState) => state.userReducer);

  const [teamDetailMatch, setTeamDetailMatch] = useState<MatchDetail>(null);

  useEffect(() => {
    getDetailMatch().catch((err) => console.log(err));
  }, []);

  const getDetailMatch = async () => {
    try {
      const { data }: AxiosResponse<NextMatch> = await axios.get(
        `${ASSIST_SERVER_URL}/match/${route.params?.matchId}`,
        { headers: { authorization: `Bearer ${token}` } },
      );
      console.log(data);
      setTeamDetailMatch(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const voteUserNum = (userNum: number) => {
    const allUsersNum: number =
      teamDetailMatch?.attend.length +
      teamDetailMatch?.absent.length +
      teamDetailMatch?.hold.length +
      teamDetailMatch?.nonRes.length;

    return !allUsersNum ? '0' : `${Math.round((userNum / allUsersNum) * 100)}`;
  };

  return (
    <>
      <CloseHeader action={true} color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>참석 투표 현황</Bold>
          <Regular size={17}>
            {`${teamDetailMatch?.date} (${teamDetailMatch?.day}) ${teamDetailMatch?.startTime} ~ ${teamDetailMatch?.endTime}`}
          </Regular>
        </MainTitle>
        <ContentContainer>
          {/* <VotePercentBar>
            <VoteAttend />
            <PercentBarSpace />
            <VoteNonAttend />
            <PercentBarSpace />
            <VoteUndefined />
            <PercentBarSpace />
            <VoteNonResponse />
          </VotePercentBar> */}
          <BarSpaceContent />
          <VotePercentContents>
            <VotePercentCard
              blockColor={colors.blue}
              title="참석"
              person={teamDetailMatch?.attend.length}
              percent={voteUserNum(teamDetailMatch?.attend.length)}
            />
            <VotePercentCard
              blockColor={colors.darkGray}
              title="불참"
              person={teamDetailMatch?.absent.length}
              percent={voteUserNum(teamDetailMatch?.absent.length)}
            />
            <VotePercentCard
              blockColor={colors.gray}
              title="미정"
              person={teamDetailMatch?.hold.length}
              percent={voteUserNum(teamDetailMatch?.hold.length)}
            />
            <VotePercentCard
              blockColor={colors.lightGray}
              title="미응답"
              person={teamDetailMatch?.nonRes.length}
              percent={voteUserNum(teamDetailMatch?.nonRes.length)}
            />
          </VotePercentContents>
          <CardSpaceCard />
          <VoteStatusCard title="참석" data={teamDetailMatch?.attend} />
          <VoteStatusCard title="불참" data={teamDetailMatch?.absent} />
          <VoteStatusCard title="미정" data={teamDetailMatch?.hold} />
          <VoteStatusCard title="미응답" data={teamDetailMatch?.nonRes} />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
