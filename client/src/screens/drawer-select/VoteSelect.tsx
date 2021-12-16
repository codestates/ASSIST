import { ASSIST_SERVER_URL } from '@env';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import CommonModalButton from '../../components/button/CommonModalButton';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import useMatchVote from '../../hooks/useMatchVote';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { RootState } from '../../store/reducers';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const Title = styled(Bold)`
  font-size: 19px;
  margin-bottom: 18px;
`;

const SubTitle = styled(Regular)`
  margin-bottom: 30px;
  color: ${colors.gray};
`;

const Wrapper = styled.View`
  padding: 20px 15px 30px 15px;
`;

type VoteSelectProps = StackScreenProps<RootStackParamList, 'VoteSelect'>;

export default function VoteSelect({ route }: VoteSelectProps) {
  const { matchId } = useSelector((state: RootState) => state.propsReducer);
  const { token } = useSelector((state: RootState) => state.userReducer);
  const matchVote = useMatchVote();

  const voteMatch = async (vote: '참석' | '불참' | '미정') => {
    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/match/${matchId}/vote`,
        { vote },
        { headers: { authorization: `Bearer ${token}` } },
      );
      matchVote();
    } catch (error) {
      console.log(error);
    }
  };

  const getVoteSelect = () => {
    if (route.params?.vote === 'attend') {
      return (
        <Wrapper>
          <Title>✅ 참석으로 투표</Title>
          <SubTitle>즐겁게 경기 해 보아요!</SubTitle>
          <CommonModalButton text="네, 좋아요  >" color="blue" onPress={() => voteMatch('참석')} />
        </Wrapper>
      );
    } else if (route.params?.vote === 'absent') {
      return (
        <Wrapper>
          <Title>😭 불참으로 투표</Title>
          <SubTitle>참석 할 수 있게 되면 꼭 다시 투표 해 주세요!</SubTitle>
          <CommonModalButton
            text="네, 약속 할게요  >"
            color="blue"
            onPress={() => voteMatch('불참')}
          />
        </Wrapper>
      );
    } else if (route.params?.vote === 'hold') {
      return (
        <Wrapper>
          <Title>😱 미정으로 투표</Title>
          <SubTitle>참석 여부가 정해지면 꼭 빠르게 투표 해 주세요!</SubTitle>
          <CommonModalButton
            text="네, 약속 할게요  >"
            color="blue"
            onPress={() => voteMatch('미정')}
          />
        </Wrapper>
      );
    }
  };

  return <BottomDrawer>{getVoteSelect()}</BottomDrawer>;
}
