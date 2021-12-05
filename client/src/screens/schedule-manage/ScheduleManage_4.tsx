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

const TitleSpaceContents = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentsSpaceContents = styled.View`
  flex: 2;
`;

const Container = styled.View`
  width: 100%;
  height: 40%;
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

type ScheduleManageProps = StackScreenProps<RootStackParamList, 'ScheduleManage_3'>;

export default function ScheduleManage_4({ route }: ScheduleManageProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isPressed, setIsPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isPressed) {
        setIsPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isPressed]);

  const clearErrorMessage = () => setErrorMessage('');

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
              <Regular size={20}>2021-08-18(수)</Regular>
              <Bold size={20}>
                시작 18:00 <AntDesign name="arrowright" size={20} /> 20:00 종료
              </Bold>
              <Regular size={16}>서울 동대문구 천호대로 133</Regular>
              <Regular size={16}>홈플러스 동대문점 옥상층 HM풋살파크</Regular>
            </MatchInfoContents>
          </MatchInfoContainer>
        </Container>
      </NextPageView>
      <NextButton
        disabled={false}
        text="팀 전체에 공지하기"
        onPress={() => {
          // 알림톡 보내기
          navigation.navigate('ScheduleManage_5');
        }}
      />
    </>
  );
}
