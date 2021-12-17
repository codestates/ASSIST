/* eslint-disable @typescript-eslint/no-misused-promises */
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
import useNextMatch from '../../hooks/useNextMatch';
import LoadingView from '../../components/view/LoadingView';
import useMatchDetail from '../../hooks/useMatchDetail';

const MainTitleSpaceContents = styled.View`
  width: 100%;
  height: 30px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const CardSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const ButtonSpace = styled.View`
  height: 12px;
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

const Vote = styled.TouchableOpacity`
  padding: 16px;
  border: 1px solid ${colors.lightGray};
`;

export default function MatchVote_1({ route }: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [data, setData] = useState({
    vote: '',
    attend: [],
    absent: [],
    hold: [],
    nonRes: [],
    date: '',
    startTime: '',
    endTime: '',
    address: '',
    address2: '',
    day: '',
  });

  useEffect(() => {
    if (route.params) {
      setData(route.params.data);
    }
    setIsLoading(false);
    return () => {
      setIsLoading(true);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  // const { isLoading, data } = useMatchDetail(route.params?.matchId);
  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <CloseHeader color={colors.gray} />
      <ColoredScrollView isCard={true} titleColor={colors.gray}>
        <MainTitle marginBottom="15px">
          <MainTitleText size={22}>인원 모집 중 💬</MainTitleText>
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
          <Vote onPress={() => navigation.navigate('VoteSelect', { vote: 'attend' })}>
            <Regular>😍 참석</Regular>
          </Vote>
          <ButtonSpace />
          <Vote onPress={() => navigation.navigate('VoteSelect', { vote: 'absent' })}>
            <Regular>😭 불참</Regular>
          </Vote>
          <ButtonSpace />
          <Vote onPress={() => navigation.navigate('VoteSelect', { vote: 'hold' })}>
            <Regular>😱 미정</Regular>
          </Vote>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
