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
import CommonModalButton from '../../components/button/CommonModalButton';
import useMatchDetail from '../../hooks/useMatchDetail';
import LoadingView from '../../components/view/LoadingView';

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

export default function MatchVote_4() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isLoading, data } = useMatchDetail();

  const handleDetailVote = () => {
    navigation.navigate('MatchVote_6');
  };

  const handleHomeGoBack = () => {
    navigation.navigate('Home');
  };

  const getAttendView = () => {
    if (data?.vote === 'attend') {
      return (
        <VoteSelected>
          <Bold white>😍 참석</Bold>
          <Bold white>{data.attend.length}명</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular gray>😍 참석</Regular>
          <Regular gray>{data?.attend.length}명</Regular>
        </Vote>
      );
    }
  };

  const getAbsentView = () => {
    if (data?.vote === 'absent') {
      return (
        <VoteSelected>
          <Bold white>😭 불참</Bold>
          <Bold white>{data.absent.length}명</Bold>
        </VoteSelected>
      );
    } else {
      return (
        <Vote>
          <Regular gray>😭 불참</Regular>
          <Regular gray>{data?.absent.length}명</Regular>
        </Vote>
      );
    }
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <CloseHeader goHome color={colors.red} />
      <ColoredScrollView isFinished isCard titleColor={colors.red}>
        <MainTitle marginBottom="15px">
          <MainTitleText size={22}>경기 취소 😭</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <Bold gray size={20}>
            경기 정보
          </Bold>
          <MainTitleSpaceContents />
          <Regular gray size={17}>
            {data?.date}({data?.day})
          </Regular>
          <TextSpaceText />
          <Bold gray size={17}>
            시작 {data?.startTime} <AntDesign name="arrowright" size={17} /> {data?.endTime} 종료
          </Bold>
          <TextSpaceText />
          <MatchInfoDetailStadium>{data?.address}</MatchInfoDetailStadium>
          <TextSpaceText />
          <MatchInfoDetailStadium>{data?.address2}</MatchInfoDetailStadium>
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
            onPress={handleHomeGoBack}
          />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
