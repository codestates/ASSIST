import { ASSIST_SERVER_URL } from '@env';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import CommonModalButton from '../../components/button/CommonModalButton';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import useMatchVote from '../../hooks/useMatchVote';
import { RootState } from '../../store/reducers';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const Title = styled(Bold)`
  font-size: 19px;
  margin-bottom: 18px;
`;

const SubTitle = styled(Regular)`
  margin-bottom: 40px;
  color: ${colors.gray};
`;

const Wrapper = styled.View`
  padding: 20px 15px 30px 15px;
`;

const ButtonSpace = styled.View`
  height: 20px;
`;

export default function ConfirmSelect() {
  const { matchId } = useSelector((state: RootState) => state.propsReducer);
  const { token } = useSelector((state: RootState) => state.userReducer);
  const matchVote = useMatchVote();

  const confirmMatch = async () => {
    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/match/${matchId}`,
        { condition: '경기 확정' },
        { headers: { authorization: `Bearer ${token}` } },
      );
      matchVote();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BottomDrawer>
      <Wrapper>
        <Title>경기 확정</Title>
        <SubTitle>경기 확정 시, 팀원에게 알림을 보냅니다.</SubTitle>
        <CommonModalButton
          onPress={() => confirmMatch()}
          height={57}
          text="확정하기"
          color="blue"
        />
        <ButtonSpace />
        <CommonModalButton
          onPress={() => matchVote()}
          height={57}
          text="돌아가기  >"
          color="whiteSmoke"
        />
      </Wrapper>
    </BottomDrawer>
  );
}
