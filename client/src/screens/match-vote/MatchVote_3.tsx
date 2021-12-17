import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import useMatchDetail from '../../hooks/useMatchDetail';
import LoadingView from '../../components/view/LoadingView';
import CommonModalButton from '../../components/button/CommonModalButton';
import { any } from 'sequelize/types/lib/operators';

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

const DottedLine = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1.2px dotted ${colors.lightGray};
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const MainTitleText = styled(Bold)`
  color: ${colors.blue};
  font-size: 22px;
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

const Space = styled.View`
  height: 5px;
`;

export default function MatchVote_3({ route }: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoadiog, setIsLoading] = useState(true);
  const [data, setData] = useState({
    vote: '',
    attend: [],
    absent: [],
    date: '',
    startTime: '',
    endTime: '',
    address: '',
    address2: '',
    day: '',
  });
  // const { isLoading, data } = useMatchDetail(route.params?.matchId);

  useEffect(() => {
    if (route.params) {
      console.log('여기');
      setData(route.params.data);
    }
    setIsLoading(false);
    return () => {
      setIsLoading(true);
    };
  }, []);

  const handleDetailVote = () => {
    navigation.navigate('MatchVote_6');
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

  return isLoadiog ? (
    <LoadingView />
  ) : (
    <>
      <CloseHeader color={colors.lightBlue} />
      <ColoredScrollView isCard={true} titleColor={colors.lightBlue}>
        <MainTitle marginBottom="15px">
          <MainTitleText>경기 확정 🎉🎉</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <Bold size={20}>경기 정보</Bold>
          <MainTitleSpaceContents />
          <Regular size={17}>
            {data?.date}({data?.day})
          </Regular>
          <TextSpaceText />
          <Bold size={17}>
            시작 {data?.startTime} <AntDesign name="arrowright" size={17} /> {data?.endTime} 종료
          </Bold>
          <TextSpaceText />
          <MatchInfoDetailStadium>{data?.address}</MatchInfoDetailStadium>
          <TextSpaceText />
          <MatchInfoDetailStadium>{data?.address2}</MatchInfoDetailStadium>
          <CardSpaceButton />
          <CommonModalButton
            onPress={() => console.log('용병 구하기')}
            height={55}
            text="용병 구하기  >"
            color="transparent"
            blueText
          />
          <DottedLine />
          {getAttendView()}
          <ButtonSpaceButton />
          {getAbsentView()}
          <CardSpaceButton />
          <CommonModalButton
            height={55}
            grayText
            color="transparent"
            text="자세히 보기 >"
            onPress={handleDetailVote}
          />
          <Space />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
