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

const ContentsSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const MainTitleSpaceSubTitle = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const Title = styled(Bold)`
  font-size: 22px;
  color: ${colors.white};
`;

const CardTitleContainer = styled.View`
  flex: 1;
`;

const CardMainTitle = styled(Bold)`
  font-size: 20px;
  color: ${colors.darkGray};
`;

const CardSubTitle = styled(Regular)`
  font-size: 17px;
  color: ${colors.gray};
`;

const CardButtonContainer = styled.View`
  flex: 1;
`;

export default function MercenaryInvite_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const onPress = () => {
    navigation.navigate('MercenaryInvite_2');
  };

  return (
    <>
      <CloseHeader color={colors.darkGray} />
      <ColoredScrollView isCard={true} titleColor={colors.darkGray}>
        <MainTitle marginBottom="15px">
          <Title size={22}>용병 초대 💪</Title>
        </MainTitle>
        <ContentContainer>
          <CardTitleContainer>
            <CardMainTitle>경기 인원이 부족하세요?</CardMainTitle>
            <MainTitleSpaceSubTitle />
            <CardSubTitle>저희가 용병을 대신 구해드릴게요!</CardSubTitle>
          </CardTitleContainer>
          <ContentsSpaceButton />
          <CardButtonContainer>
            <CommonModalButton color="blue" text="용병 초대하기" onPress={onPress} />
            <CommonModalButton
              color="transparent"
              text="돌아가기 >"
              onPress={() => console.log('홈')}
            />
          </CardButtonContainer>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
