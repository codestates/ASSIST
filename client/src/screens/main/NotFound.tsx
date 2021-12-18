import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Bold, Light } from '../../theme/fonts';
import NotFoundImage from '../../assets/images/NotFound.png';
import { colors } from '../../theme/colors';
import KakaoButton from '../../components/button/KakaoButton';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  background-color: ${colors.white};
`;

const ButtonContainer = styled.View`
  background-color: ${colors.white};
`;

const Image = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: 85%;
`;

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CopyRight = styled(Light)`
  font-size: 14px;
  margin: 14px 0px;
  color: ${colors.lightGray};
  align-self: center;
`;

export default function NotFound() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    token,
    role,
    selectedTeam: { id },
  } = useSelector((state: RootState) => state.userReducer);

  const getNavigation = () => {
    if (token.length === 0) {
      navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: 'Guest' }] }));
    } else {
      if (role.length === 0) {
        navigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: 'Landing' }] }));
      } else {
        navigation.dispatch(
          CommonActions.reset({ index: 1, routes: [{ name: 'User', params: { teamId: id } }] }),
        );
      }
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Image resizeMode="contain" source={NotFoundImage} />
          <Bold size={17}>페이지를 찾을 수 없습니다.</Bold>
        </Wrapper>
      </Container>
      <ButtonContainer>
        <KakaoButton
          isKakao={false}
          text="돌아가기 >"
          onPress={() => getNavigation()}
          transparent
        />
        <CopyRight>Illustration by Storyset</CopyRight>
      </ButtonContainer>
    </>
  );
}
