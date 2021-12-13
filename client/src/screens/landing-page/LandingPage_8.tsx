import React from 'react';
import styled from 'styled-components/native';
import { Bold, Light } from '../../theme/fonts';
import CommonModalButton from '../../components/button/CommonModalButton';
import { colors } from '../../theme/colors';
import { useDispatch } from 'react-redux';
import { changeRole } from '../../store/actions/userAction';
import useEditProfile from '../../hooks/useEditProfile';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  padding: 0px 20px;
`;

const CheckMark = styled.View`
  margin-bottom: 30px;
`;

const BoldText = styled(Bold)`
  margin-bottom: 5px;
`;

const LightText = styled(Light)`
  margin-bottom: 5px;
`;

const LastText = styled(Light)`
  margin-bottom: 30px;
`;

export default function LandingPage_8() {
  const dispatch = useDispatch();
  const editProfile = useEditProfile({ role: 'complete' });

  const goToNext = async () => {
    await editProfile();
    dispatch(changeRole('complete'));
  };

  return (
    <Container>
      <CheckMark>
        <Bold size={100}>🎉</Bold>
      </CheckMark>
      <BoldText>
        회원가입을 완료 <Light>했어요!</Light>
      </BoldText>
      <LightText>신나는 풋살 라이프,</LightText>
      <LastText>어시스트와 함께 시작해 볼까요?</LastText>
      <CommonModalButton text="네, 좋아요 😆" color="blue" onPress={() => goToNext()} />
    </Container>
  );
}
