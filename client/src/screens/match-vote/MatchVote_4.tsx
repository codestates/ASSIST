import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import CommonButton from '../../components/button/CommonButton';
import CommonModalButton from '../../components/button/CommonModalButton';

const CardSpaceCard = styled.View`
  width: 100%;
  height: 35px;
`;

const CardDotLineCard = styled.View`
  border: 1px dotted ${colors.lightGray};
`;

const ContentsSpaceContents = styled.View`
  width: 100%;
  height: 50px;
`;

const ButtonSpaceButton = styled.View`
  width: 100%;
  height: 8px;
`;

const TextSpaceText = styled.View`
  width: 100%;
  height: 8px;
`;

const ModalSpace = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const MainTitleText = styled(Bold)`
  color: ${colors.white};
  font-size: 22px;
`;

const MatchInfoContainer = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const MatchInfoTitle = styled.View`
  flex: 1;
`;

const MatchInfoContents = styled.View`
  flex: 4;
`;

const MatchInfoDetailStadium = styled(Regular)`
  font-size: 17px;
  color: ${colors.gray};
`;

const VoteContainer = styled.View`
  flex: 1;
`;

const Vote = styled.TouchableOpacity`
  flex: 1;
  padding: 16px;
  border: 1px solid ${colors.lightGray};
`;

const FooterButtonContainer = styled.View`
  flex: 1;
`;

const FooterButtonText = styled(Regular)`
  color: ${colors.gray}
  font-size: 13px;
`;

export default function MatchVote_4() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleMatchConfirmed = () => {
    console.log('만들 예정');
  };

  return (
    <>
      <CloseHeader color={colors.red} />
      <ColoredScrollView isCard={true} titleColor={colors.red}>
        <MainTitle marginBottom="15px">
          <MainTitleText>경기 취소 😭</MainTitleText>
        </MainTitle>
        <ContentContainer>
          <MatchInfoContainer>
            <MatchInfoTitle>
              <Bold size={20}>경기 정보</Bold>
            </MatchInfoTitle>
            <ContentsSpaceContents />
            <MatchInfoContents>
              <Regular size={17}>2021-08-18(수)</Regular>
              <TextSpaceText />
              <Bold size={20}>
                시작 18:00 <AntDesign name="arrowright" size={20} /> 20:00 종료
              </Bold>
              <TextSpaceText />
              <MatchInfoDetailStadium>서울 동대문구 천호대로 133</MatchInfoDetailStadium>
              <TextSpaceText />
              <MatchInfoDetailStadium>홈플러스 동대문점 옥상층 HM풋살파크</MatchInfoDetailStadium>
            </MatchInfoContents>
          </MatchInfoContainer>
          <CardSpaceCard />
          <CardDotLineCard />
          <CardSpaceCard />
          <VoteContainer>
            <Vote>
              <Regular size={17}>😍 참석</Regular>
            </Vote>
            <ButtonSpaceButton />
            <Vote>
              <Regular size={17}>😭 불참</Regular>
            </Vote>
          </VoteContainer>
          <CardSpaceCard />
          <FooterButtonContainer>
            <CommonButton
              width="100%"
              height="50px"
              buttonBorder={colors.gray}
              buttonBgColor={colors.white}
              buttonRadius="15px"
              onPress={() => console.log('자세히 보기 미개발')}>
              <FooterButtonText>
                자세히 보기 <AntDesign name="right" size={13} />
              </FooterButtonText>
            </CommonButton>
            <ModalSpace />
            <CommonModalButton
              color="transparent"
              text="돌아가기 >"
              onPress={() => console.log('돌아가기')}
            />
            <ModalSpace />
          </FooterButtonContainer>
        </ContentContainer>
      </ColoredScrollView>
    </>
  );
}
