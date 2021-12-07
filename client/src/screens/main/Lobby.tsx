import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import CommonButton from '../../components/button/CommonButton';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { Medium, Regular } from '../../theme/fonts';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const CenteredView = styled.View`
  justify-content: center;
  align-items: center;
`;

const TopView = styled(CenteredView)`
  flex: 0.4;
  background-color: ${colors.lightGray};
`;

const BottomView = styled(CenteredView)`
  flex: 0.4;
  background-color: ${colors.whiteSmoke};
`;

const BannerSpace = styled.View`
  flex: 0.2;
  background-color: ${colors.gray};
`;

const TextContainer = styled(CenteredView)`
  height: 50px;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  margin-top: 35px;
`;

export default function Lobby() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <Container>
      <TopView>
        <TextContainer>
          <Medium size={17}>똑똑한 우리팀 비서</Medium>
          <Medium size={17}>어시스트 ASSIST</Medium>
        </TextContainer>
      </TopView>
      <BottomView>
        <TextContainer>
          <Medium size={17}>주장님은 경기에 집중하세요,</Medium>
          <Medium size={17}>경기 준비는 어시스트가 도와드릴게요!</Medium>
        </TextContainer>
        <ButtonContainer>
          <CommonButton
            width="125px"
            height="40px"
            buttonBgColor={colors.blue}
            buttonRadius="20px"
            onPress={() => navigation.navigate('GetStarted')}>
            <Regular white>지금 시작하기</Regular>
          </CommonButton>
        </ButtonContainer>
      </BottomView>
      <BannerSpace></BannerSpace>
    </Container>
  );
}
