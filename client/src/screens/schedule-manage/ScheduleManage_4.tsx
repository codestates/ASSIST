import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light, Regular } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import { RootState } from '../../store/reducers';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';

const TitleSpaceContents = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentsSpaceContents = styled.View`
  width: 100%;
  height: 35px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const Container = styled.View`
  width: 100%;
  height: 40%;
`;

const MatchInfoContainer = styled.View`
  width: 100%;
  background-color: ${colors.whiteSmoke};
  border: 1px solid ${colors.lightGray};
  padding: 32px;
`;

const MatchInfoTitle = styled.View`
  width: 100%;
`;

const MatchInfoContents = styled.View`
  width: 100%;
  justify-content: space-between;
`;

export default function ScheduleManage_4() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { scheduleManage } = useSelector((state: RootState) => state.propsReducer);
  const { token, selectedTeam } = useSelector((state: RootState) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveSchedule = () => {
    setIsLoading(true);
    axios
      .post(
        `${ASSIST_SERVER_URL}/match`,
        { ...scheduleManage, teamId: selectedTeam.id },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )
      .then((res: AxiosResponse<{ id: number }>) => {
        navigation.navigate('ScheduleManage_5', { matchId: res.data.id });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            경기 정보<Light size={22}>를</Light>
          </Bold>
          <Light size={22}>최종 확인 해 주세요 ✅</Light>
        </MainTitle>
        <TitleSpaceContents />
        <Container>
          <MatchInfoContainer>
            <MatchInfoTitle>
              <Bold size={20}>경기 정보</Bold>
            </MatchInfoTitle>
            <ContentsSpaceContents />
            <MatchInfoContents>
              <Regular size={20}>{scheduleManage.date}</Regular>
              <TextSpaceText />
              <Bold size={20}>
                시작 {scheduleManage.startTime} <AntDesign name="arrowright" size={20} />
                {scheduleManage.endTime} 종료
              </Bold>
              <TextSpaceText />
              <Regular size={16}>{scheduleManage.address}</Regular>
              <TextSpaceText />
              <Regular size={16}>{scheduleManage.address2}</Regular>
            </MatchInfoContents>
          </MatchInfoContainer>
        </Container>
      </NextPageView>
      <NextButton disabled={isLoading} text="팀 전체에 공지하기" onPress={handleSaveSchedule} />
    </>
  );
}
