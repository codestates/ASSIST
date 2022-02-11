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
  background-color: ${colors.blue};
`;

const ButtonSpace = styled.View`
  height: 12px;
`;

const DottedLine = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1.2px dotted ${colors.lightGray};
`;

type MatchVoteProps = StackScreenProps<RootStackParamList, 'MatchVote_5'>;

export default function MatchVote_5({ route }: MatchVoteProps) {
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
          <Bold white>😍 참석</Bold>
          <Bold white>{attendLength}명</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular>😍 참석</Regular>
          <Regular>{attendLength}명</Regular>
        </Vote>
      );
    }
  };

  const getAbsentView = () => {
    if (route.params?.data?.vote === 'absent') {
      return (
        <VoteSelected>
          <Bold white>😭 불참</Bold>
          <Bold white>{absentLength + holdLength + nonResLendgth}명</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular gray>😭 불참</Regular>
          <Regular gray>{absentLength + holdLength + nonResLendgth}명</Regular>
        </Vote>
      );
    }
  };

  const getColor = () => (route.params?.inGame ? colors.yellow : colors.blue);

  const getTitle = () =>
    route.params?.inGame ? (
      <Bold size={22}>경기 중 💬</Bold>
    ) : (
      <Bold white size={22}>
        경기 완료 ✅
      </Bold>
    );

  return (
    <>
      <CloseHeader color={getColor()} />
      <ColoredScrollView isFinished isCard titleColor={getColor()}>
        <MainTitle marginBottom="15px">{getTitle()}</MainTitle>
        <ContentContainer>
          <Bold size={20}>경기 정보</Bold>
          <MainTitleSpaceContents />
          <Regular size={17}>
            {route.params?.data?.date}({route.params?.data?.day})
          </Regular>
          <TextSpaceText />
          <Bold size={17}>
            시작 {route.params?.data?.startTime} →{' '}
            {route.params?.data?.daypassing && <Bold size={13}>익일 </Bold>}
            {route.params?.data?.endTime} 종료
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
            text="자세히 보기"
            onPress={handleDetailVote}
            height={55}
          />
          <ButtonSpace />
          <CommonModalButton
            height={55}
            color="transparent"
            text="돌아가기  >"
            onPress={() => goHome()}
          />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
