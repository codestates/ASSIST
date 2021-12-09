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
              <Bold size={20}>FC 살쾡이</Bold>
            </MatchInfoTitle>
            <ContentsSpaceContents />
            <MatchInfoContents>
              <Regular size={20}>2021-08-18(수)</Regular>
              <Bold size={20}>
                시작 18:00 <AntDesign name="arrowright" size={20} /> 20:00 종료
              </Bold>
              <Regular size={16}>서울 동대문구 천호대로 133</Regular>
              <Regular size={16}>홈플러스 동대문점 옥상층 HM풋살파크</Regular>
            </MatchInfoContents>
            <ContentSpaceButton />
            <MecenaryAttendContainer>
              <Bold size={16}>참가비 : 15,000원</Bold>
            </MecenaryAttendContainer>
          </MatchInfoContainer>
        </Container>
      </NextPageView>
      <NextButton
        disabled={false}
        text="구인 신청 >"
        onPress={() => {
          navigation.navigate('MercenaryInvite_5');
        }}
      />
    </>
  );
}
