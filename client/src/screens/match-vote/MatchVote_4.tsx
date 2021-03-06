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
import useGoHome from '../../hooks/useGoHome';
import { StackScreenProps } from '@react-navigation/stack';

const MainTitleSpaceContents = styled.View`
  height: 30px;
`;

const TextSpaceText = styled.View`
  height: 8px;
`;

const CardSpaceButton = styled.View`
  height: 35px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const MainTitleText = styled(Bold)`
  font-size: 22px;
  color: ${colors.white};
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 15px;
  color: ${colors.gray};
`;

const Vote = styled.View`
  padding: 16px;
  background-color: ${colors.whiteSmoke};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VoteSelected = styled(Vote)`
  background-color: ${colors.gray};
`;

const ButtonSpace = styled.View`
  height: 12px;
`;

const DottedLine = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1.2px dotted ${colors.lightGray};
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_4'>;

export default function MatchVote_4({ route }: MatchVoteProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goHome = useGoHome();

  const handleDetailVote = () => {
    navigation.navigate('MatchVote_6');
  };

  const attendLength = route.params?.data?.attend.length || 0;
  const absentLength = route.params?.data?.absent.length || 0;
  const holdLength = route.params?.data?.hold.length || 0;
  const nonResLendgth = route.params?.data?.nonRes.length || 0;

  const getAttendView = () => {
    if (route.params?.data?.vote === 'attend') {
      return (
        <VoteSelected>
          <Bold white>???? ??????</Bold>
          <Bold white>{attendLength}???</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular gray>???? ??????</Regular>
          <Regular gray>{attendLength}???</Regular>
        </Vote>
      );
    }
  };

  const getAbsentView = () => {
    if (
      route.params?.data?.vote === 'absent' ||
      route.params?.data?.vote === 'hold' ||
      route.params?.data?.vote === 'nonRes'
    ) {
      return (
        <VoteSelected>
          <Bold white>???? ??????</Bold>
          <Bold white>{absentLength + holdLength + nonResLendgth}???</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular gray>???? ??????</Regular>
          <Regular gray>{absentLength + holdLength + nonResLendgth}???</Regular>
        </Vote>
      );
    }
  };

  return (
    <>
      <CloseHeader color={colors.red} />
      <ColoredScrollView isFinished isCard titleColor={colors.red}>
        <MainTitle marginBottom="15px">
          <MainTitleText size={22}>?????? ?????? ????</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <Bold gray size={20}>
            ?????? ??????
          </Bold>
          <MainTitleSpaceContents />
          <Regular gray size={17}>
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
          <DottedLine />
          {getAttendView()}
          <ButtonSpace />
          {getAbsentView()}
          <CardSpaceButton />
          <CommonModalButton
            color="transparent"
            grayText
            text="????????? ??????"
            onPress={handleDetailVote}
            height={55}
          />
          <ButtonSpace />
          <CommonModalButton
            height={55}
            color="transparent"
            text="????????????  >"
            onPress={() => goHome()}
          />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
