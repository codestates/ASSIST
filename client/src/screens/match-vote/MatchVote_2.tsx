import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import CommonModalButton from '../../components/button/CommonModalButton';
import DeadLineTimer from '../../components/timer/DeadLineTimer';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const MainTitleSpaceContents = styled.View`
  height: 35px;
`;

const TextSpaceText = styled.View`
  height: 8px;
`;

const CardSpaceButton = styled.View`
  height: 35px;
`;

const ButtonSpaceButton = styled.View`
  height: 12px;
`;

const Space = styled.View`
  height: 16px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 15px;
  color: ${colors.gray};
`;

const Vote = styled.TouchableOpacity`
  padding: 16px;
  background-color: ${colors.whiteSmoke};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VoteNonRes = styled(Vote)`
  background-color: ${colors.white};
`;

const VoteSelected = styled(Vote)`
  background-color: ${colors.blue};
`;

const DottedLine = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1.2px dotted ${colors.lightGray};
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_2'>;

export default function MatchVote_2({ route }: MatchVoteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { leader } = useSelector((state: RootState) => state.userReducer.selectedTeam);

  const handleDetailVote = () => {
    navigation.navigate('MatchVote_6');
  };

  const getAttendView = () => {
    if (route.params?.data?.vote === 'attend') {
      return (
        <VoteSelected>
          <Bold white>???? ??????</Bold>
          <Bold white>{route.params.data.attend.length}???</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote
          onPress={() =>
            navigation.navigate('VoteSelect', { vote: 'attend', matchId: route.params?.data?.id })
          }>
          <Regular gray>???? ??????</Regular>
          <Regular gray>{route.params?.data?.attend.length}???</Regular>
        </Vote>
      );
    }
  };

  const getAbsentView = () => {
    if (route.params?.data?.vote === 'absent') {
      return (
        <VoteSelected>
          <Bold white>???? ??????</Bold>
          <Bold white>{route.params.data.absent.length}???</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote
          onPress={() =>
            navigation.navigate('VoteSelect', { vote: 'absent', matchId: route.params?.data?.id })
          }>
          <Regular gray>???? ??????</Regular>
          <Regular gray>{route.params?.data?.absent.length}???</Regular>
        </Vote>
      );
    }
  };

  const getHoldView = () => {
    if (route.params?.data?.vote === 'hold') {
      return (
        <VoteSelected>
          <Bold white>???? ??????</Bold>
          <Bold white>{route.params.data.hold.length}???</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote
          onPress={() =>
            navigation.navigate('VoteSelect', { vote: 'hold', matchId: route.params?.data?.id })
          }>
          <Regular gray>???? ??????</Regular>
          <Regular gray>{route.params?.data?.hold.length}???</Regular>
        </Vote>
      );
    }
  };

  return (
    <>
      <CloseHeader color={colors.lightGray} />
      <ColoredScrollView isCard={true} titleColor={colors.lightGray}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>?????? ?????? ????</Bold>
        </MainTitle>
        <ContentContainer>
          <Bold size={20}>?????? ??????</Bold>
          <MainTitleSpaceContents />
          <Regular size={17}>
            {route.params?.data?.date}({route.params?.data?.day})
          </Regular>
          <TextSpaceText />
          <Bold size={17}>
            ?????? {route.params?.data?.startTime} ???{' '}
            {route.params?.data?.daypassing && <Bold size={13}>?????? </Bold>}
            {route.params?.data?.endTime} ??????
          </Bold>
          <TextSpaceText />
          <MatchInfoDetailStadium>{route.params?.data?.address}</MatchInfoDetailStadium>
          <TextSpaceText />
          <MatchInfoDetailStadium>{route.params?.data?.address2}</MatchInfoDetailStadium>
          {leader && (
            <>
              <CardSpaceButton />
              <CommonModalButton
                onPress={() => navigation.navigate('ConfirmSelect')}
                height={55}
                color="blue"
                text="?????? ??????  >"
              />
            </>
          )}
          <DottedLine />
          {getAttendView()}
          <ButtonSpaceButton />
          {getAbsentView()}
          <ButtonSpaceButton />
          {getHoldView()}
          <ButtonSpaceButton />
          <VoteNonRes>
            <Regular gray>???? ?????????</Regular>
            <Regular gray>{route.params?.data?.nonRes.length}???</Regular>
          </VoteNonRes>
          <CardSpaceButton />
          <DeadLineTimer deadLine={String(route.params?.data?.deadline)} />
          {leader && (
            <>
              <CommonModalButton
                onPress={() => navigation.navigate('MercenaryInvite')}
                height={55}
                text="?????? ?????????  >"
                color="transparent"
                blueText
              />
              <Space />
            </>
          )}

          <CommonModalButton
            height={55}
            color="transparent"
            text="????????? ??????  >"
            onPress={handleDetailVote}
          />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
