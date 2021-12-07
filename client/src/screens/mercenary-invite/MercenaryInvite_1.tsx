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

const MainTitleSpaceSubTitle = styled.View`
  width: 100%;
  height: 16px;
`;

const TitleSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const ButtonSpaceButton = styled.View`
  width: 100%;
  height: 8px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const MainTitleText = styled(Bold)`
  font-size: 22px;
  color: ${colors.white};
`;

const CardMainTitle = styled(Bold)`
  font-size: 20px;
  color: ${colors.darkGray};
`;

const CardSubTitle = styled(Regular)`
  font-size: 17px;
  color: ${colors.gray};
`;

export default function MercenaryInvite_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const onPress = () => {
    navigation.navigate('MercenaryInvite_2');
  };

  const handleHomeGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <>
      <CloseHeader color={colors.darkGray} />
      <ColoredScrollView isCard={true} titleColor={colors.darkGray}>
        <MainTitle marginBottom="15px">
          <MainTitleText>용병 초대 💪</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <CardMainTitle>경기 인원이 부족하세요?</CardMainTitle>
          <MainTitleSpaceSubTitle />
          <CardSubTitle>저희가 용병을 대신 구해드릴게요!</CardSubTitle>
          <TitleSpaceButton />
          <CommonModalButton color="blue" text="용병 초대하기" onPress={onPress} />
          <ButtonSpaceButton />
          <CommonModalButton color="transparent" text="돌아가기 >" onPress={handleHomeGoBack} />
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
