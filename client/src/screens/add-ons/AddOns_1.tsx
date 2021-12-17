/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import CloseHeader from '../../components/header/CloseHeader';
import axios, { AxiosResponse } from 'axios';
import { TeamLastMatchs } from '../../../@types/global/types';
import { ASSIST_SERVER_URL } from '@env';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import CardScrollView from '../../components/view/CardScrollView';
import Card from '../../components/card/Card';
import ConfirmedMark from '../../components/mark/ConfirmedMark';
import GatheringMark from '../../components/mark/GatheringMark';
import VotedMark from '../../components/mark/VotedMark';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const MainTitleSpaceContents = styled.View`
  width: 100%;
  height: 32px;
`;

const CardSpaceCard = styled.View`
  width: 100%;
  height: 35px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const MainTitleContainer = styled.View`
  width: 100%;
  padding-horizontal: 20px;
`;

const ContentsContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.whiteSmoke};
  margin-bottom: 30px;
`;

const CardTitleContainer = styled.View`
  width: 100%;
  height: 20%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardTitleRedBox = styled.View`
  width: 25%;
  height: 100%;
  background-color: ${colors.red};
  align-items: center;
  justify-content: center;
`;

const CardTitleBlueBox = styled.View`
  width: 25%;
  height: 100%;
  background-color: ${colors.blue};
  align-items: center;
  justify-content: center;
`;

const CardTitleText = styled(Regular)`
  font-size: 15px;
  color: ${colors.white};
`;

const CardTitleButtonBox = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: transparent;
`;

const CardTitleButtonText = styled(Regular)`
  font-size: 15px;
  color: ${colors.gray};
`;
const MatchInfoDetailStadium = styled(Regular)`
  font-size: 16px;
  color: ${colors.gray};
`;

const FooterPageNumber = styled(TouchableOpacity)`
  width: 35px;
  height: 35px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const PageNumber = styled(Regular)`
  color:${colors.darkGray}
  font-size: 20px;
`;

export default function AddOns_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, selectedTeam } = useSelector((state: RootState) => state.userReducer);
  const [lastMatch, setLastMatch] = useState<TeamLastMatchs>({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLastMatch().catch((error) => console.log(error));
    });
    return unsubscribe;
  }, [navigation]);

  const getLastMatch = async (pageNumber = 1) => {
    try {
      const { data }: AxiosResponse<TeamLastMatchs> = await axios.get(
        `${ASSIST_SERVER_URL}/match/team/${selectedTeam.id}?limit=5&page=${pageNumber}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      setLastMatch(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getConditionMark = (condition: string) => {
    if (condition === '인원 모집 중') {
      return <GatheringMark />;
    } else if (condition === '투표 완료') {
      return <VotedMark />;
    } else if (condition === '경기 확정') {
      return <ConfirmedMark />;
    } else if (condition === '경기 취소') {
      return (
        <CardTitleRedBox>
          <CardTitleText>경기 취소</CardTitleText>
        </CardTitleRedBox>
      );
    } else {
      return (
        <CardTitleBlueBox>
          <CardTitleText>경기 완료</CardTitleText>
        </CardTitleBlueBox>
      );
    }
  };

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const handleDetailVote = (id: number) => {
    navigation.navigate('MatchVote', { screen: 'MatchVote_6', params: { id: id } });
  };

  return (
    <>
      <CloseHeader color={colors.whiteSmoke} />
      <MainTitleContainer>
        <MainTitle marginBottom="15px">
          <Bold size={22}>지난 경기 기록</Bold>
          <Regular size={17}>{selectedTeam.name}</Regular>
        </MainTitle>
      </MainTitleContainer>
      <CardScrollView color={colors.whiteSmoke}>
        <ContentsContainer>
          {lastMatch.lastMatchs?.map((el) => (
            <>
              <Card key={el.id} margin={16}>
                <CardTitleContainer>
                  {getConditionMark(el.condition)}
                  <CardTitleButtonBox
                    onPress={() => {
                      handleDetailVote(el.id);
                    }}>
                    <CardTitleButtonText>자세히 보기</CardTitleButtonText>
                  </CardTitleButtonBox>
                </CardTitleContainer>
                <MainTitleSpaceContents />
                <Regular size={17}>{el.date}</Regular>
                <TextSpaceText />
                <Bold size={20}>
                  시작 {el.startTime} <AntDesign name="arrowright" size={20} /> {el.endTime} 종료
                </Bold>
                <TextSpaceText />
                <MatchInfoDetailStadium>{el.address}</MatchInfoDetailStadium>
                <TextSpaceText />
                <MatchInfoDetailStadium>{el.address2}</MatchInfoDetailStadium>
              </Card>
              <CardSpaceCard />
            </>
          ))}
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '60%',
              marginVertical: 15,
            }}
            pagingEnabled={true}
            horizontal={true}
            data={lastMatch?.lastMatchs}
            renderItem={({ item, index }) =>
              index + 1 === lastMatch?.totalPage + 1 ? (
                <></>
              ) : (
                <FooterPageNumber onPress={() => getLastMatch(index + 1)}>
                  <PageNumber>{index + 1}</PageNumber>
                </FooterPageNumber>
              )
            }
          />
        </ContentsContainer>
      </CardScrollView>
    </>
  );
}
