import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light, Regular } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import SubTitle from '../../components/text/SubTitle';
import useNextMatch from '../../hooks/useNextMatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import axios from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import getTextValues from '../../functions/getTextValues';

const TitleSpaceContents = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentsSpaceContents = styled.View`
  flex: 2;
`;

const ContentSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const Container = styled.View`
  width: 100%;
  height: 50%;
`;

const MatchInfoContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${colors.whiteSmoke};
  border: 1px solid ${colors.lightGray};
  padding: 32px;
`;

const MatchInfoTitle = styled.View`
  flex: 1;
`;

const MatchInfoContents = styled.View`
  flex: 4;
  justify-content: space-between;
`;

const MecenaryAttendContainer = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${colors.lightGray}
  align-items: center;
  justify-content: center;

`;

export default function MercenaryInvite_4() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { selectedTeam, token } = useSelector((state: RootState) => state.userReducer);
  const dto = useSelector((state: RootState) => state.propsReducer.mercenaryInvite);
  const { data } = useNextMatch({ teamId: selectedTeam?.id });

  const handleRequest = () => {
    axios
      .post(`${ASSIST_SERVER_URL}/match/${data?.id}/mercenery`, dto, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((el) => {
        navigation.navigate('MercenaryInvite_5');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            초대할 정보<Light size={22}>를</Light>
          </Bold>
          <Light size={22}>최종 확인해 주세요 ✅</Light>
        </MainTitle>
        <SubTitle>
          <Light size={14}>1시간 내로 초대 결과를 알려 드릴게요.</Light>
        </SubTitle>
        <TitleSpaceContents />
        <Container>
          <MatchInfoContainer>
            <MatchInfoTitle>
              <Bold size={20}>{selectedTeam?.name}</Bold>
            </MatchInfoTitle>
            <ContentsSpaceContents />
            <MatchInfoContents>
              <Regular size={17}>
                {data?.date}
                {data?.day}
              </Regular>
              <Bold size={17}>
                시작 {data?.startTime} <AntDesign name="arrowright" size={17} /> {data?.endTime}{' '}
                종료
              </Bold>
              <Regular size={15}>{data?.address}</Regular>
              <Regular size={15}>{data?.address2}</Regular>
            </MatchInfoContents>
            <ContentSpaceButton />
            <MecenaryAttendContainer>
              <Bold size={15}>
                참가비 : {getTextValues({ text: `${dto.money}`, type: 'money' })}원
              </Bold>
            </MecenaryAttendContainer>
          </MatchInfoContainer>
        </Container>
      </NextPageView>
      <NextButton disabled={false} text="구인 신청 >" onPress={() => handleRequest()} />
    </>
  );
}
