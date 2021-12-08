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
import NextButton from '../../components/button/NextButton';
import TeamMemberCard from '../../components/card/TeamMeberCard';

const HeaderSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const ButtonSpaceContents = styled.View`
  width: 100%;
  height: 35px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

export default function AddOns_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const MemberStatus = 'Captain';

  return (
    <>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>팀 구성원</Bold>
          <Regular size={17}>FC 살쾡이</Regular>
        </MainTitle>
        <ContentContainer>
          <HeaderSpaceButton />
          <CommonModalButton
            disabled={MemberStatus === 'Captain'}
            color="blue"
            text="+ 팀원 초대하기"
            onPress={() => console.log('팀원 초대 하기')}
          />
          <ButtonSpaceContents />
          <TeamMemberCard />
        </ContentContainer>
      </ColoredScrollView>
      <NextButton
        disabled={MemberStatus === 'Captain'}
        text="주장 위임 하기 >"
        onPress={() => {
          console.log('주장 위임');
        }}
      />
    </>
  );
}
