import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Bold, Light } from '../../theme/fonts';
import { colors } from '../../theme/colors';
import KakaoButton from '../../components/button/KakaoButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import useReset from '../../hooks/useReset';
import NotFoundImage from '../../assets/images/NotFound.png';
import { getSelectedTeam } from '../../store/actions/userAction';

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
  height: ${Dimensions.get('window').height * 0.8}px;
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
  const {
    token,
    role,
    selectedTeam: { id },
  } = useSelector((state: RootState) => state.userReducer);
  const resetGuest = useReset({ screenName: 'Guest' });
  const resetIntro = useReset({ screenName: 'Intro' });
  const resetQuickTips = useReset({ screenName: 'QuickTips' });
  const resetUser = useReset({ screenName: 'User', params: { teamId: id } });
  const dispatch = useDispatch();

  useEffect(() => {
    if (role !== 'tips2') {
      dispatch(getSelectedTeam({ id: -1, name: '', leader: false }));
    }
  }, []);

  const getNavigation = () => {
    if (token.length === 0) {
      resetGuest();
    } else {
      if (role.length === 0) {
        resetIntro();
      } else if (role === 'tips') {
        resetQuickTips();
      } else {
        resetUser();
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
