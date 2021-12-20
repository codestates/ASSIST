/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { RootState } from '../../store/reducers';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import CaptainMark from '../mark/CaptainMark';
import { TeamInfo } from '../../../@types/global/types';
import { modifyLeaderId } from '../../store/actions/propsAction';
import { CommonModal, CommonModalTitle } from '../modal/CommonModal';
import CommonModalButton from '../button/CommonModalButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useToast } from 'react-native-toast-notifications';
import useGoHome from '../../hooks/useGoHome';
import { getSelectedTeam } from '../../store/actions/userAction';

const Space = styled.View`
  width: 100%;
  height: 16px;
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const ContentTitleBox = styled.View`
  width: 100%;
  flex-direction: row;
  padding-vertical: 16px;
`;

const ContentRole = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ContentName = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const ContentPhone = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

const ContentAction = styled.TouchableOpacity`
  flex: 2;
  align-items: center;
  justify-content: center;
`;

const TeamDeleteText = styled(Regular)`
  color: ${colors.gray}
  font-size: 16px;
`;

const MemberRejectionText = styled(Regular)`
  color: ${colors.red}
  font-size: 16px;
`;

type TeamMemberProps = {
  count: number;
  users: Array<{
    id: number;
    email: string;
    name: string;
    phone: string;
    gender: string;
    provider: string;
    role: string;
  }>;
  leaderId: number;
};

type NowLeaderIdProps = {
  newLeaderId: number;
  data: TeamMemberProps;
  teamId: number | string;
  getNewLeaderId: (id: number) => void;
};

export default function TeamMemberCard({
  newLeaderId,
  teamId,
  data,
  getNewLeaderId,
}: NowLeaderIdProps) {
  const dispatch = useDispatch();
  const toast = useToast();
  const goHome = useGoHome();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, selectedTeam, id } = useSelector((state: RootState) => state.userReducer);
  const [expulsionMemberId, setExpulsionMemberId] = useState(0);
  const [teamDeleteVisible, setTeamDeleteVisible] = useState(false);
  const [lastWarnVisible, setLastWarnVisible] = useState(false);
  const [leaveTeamVisible, setLeaveTeamVisible] = useState(false);
  const [lastLeaveTeamVisible, setLastLeaveTeamVisible] = useState(false);
  const [expulsionVisible, setExpulsionVisible] = useState(false);

  const removeTeam = async () => {
    try {
      await axios.delete(`${ASSIST_SERVER_URL}/team/${teamId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(getSelectedTeam({ id: -1, name: '', leader: false }));
      goHome();
      toast.show('팀 삭제가 완료 되었습니다');
    } catch (err) {
      console.log(err);
    }
  };

  const leaveTeam = async () => {
    try {
      await axios.delete(`${ASSIST_SERVER_URL}/user/team/${teamId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      dispatch(getSelectedTeam({ id: -1, name: '', leader: false }));
      goHome();
      toast.show('팀 나가기가 완료 되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  const expulsionMember = async () => {
    try {
      await axios.delete(`${ASSIST_SERVER_URL}/team/${teamId}/member/${expulsionMemberId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      navigation.replace('AddOns_2', { teamId: String(teamId) });
      setExpulsionVisible(false);
      toast.show('팀원 강퇴가 완료 되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRadioButton = (id: number) => {
    if (newLeaderId !== id) {
      getNewLeaderId(id);
      handleModifyLeaderId(id);
    } else {
      getNewLeaderId(newLeaderId);
      handleModifyLeaderId(newLeaderId);
    }
  };

  const handleModifyLeaderId = (newLeaderId: number) => {
    dispatch(modifyLeaderId({ nowLeaderId: newLeaderId }));
  };

  const handleTeamDeleteOpenModal = () => {
    setTeamDeleteVisible(true);
  };

  const handleTeamDeleteCloseModal = () => {
    setTeamDeleteVisible(false);
  };

  const handleLastWarnOpenModal = () => {
    setTeamDeleteVisible(false);
    setLastWarnVisible(true);
  };

  const handleLastWarnCloseModal = () => {
    setLastWarnVisible(false);
    setTeamDeleteVisible(true);
  };

  const handleLeaveTeamOpenModal = () => {
    setLeaveTeamVisible(true);
  };

  const handleLeaveTeamCloseModal = () => {
    setLeaveTeamVisible(false);
  };

  const handleLastLeaveTeamOpenModal = () => {
    setLeaveTeamVisible(false);
    setLastLeaveTeamVisible(true);
  };

  const handleLastLeaveTeamCloseModal = () => {
    setLastLeaveTeamVisible(false);
    setLeaveTeamVisible(true);
  };

  const handleExpulsionOpenModal = (id: number) => {
    setExpulsionVisible(true);
    setExpulsionMemberId(id);
  };

  const handleExpulsionCloseModal = () => {
    setExpulsionVisible(false);
  };

  return (
    <>
      <CommonModal visible={teamDeleteVisible} setVisible={handleTeamDeleteCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>팀 삭제하기</Bold>
          <Line>
            <Regular gray size={13}>
              모든 팀원을 강퇴하고, 팀을 어시스트에서 삭제합니다. 계속 진행 하시겠습니까?
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="팀 삭제하기" onPress={handleLastWarnOpenModal} />
        <Space />
        <CommonModalButton
          color="whiteSmoke"
          text="이전 화면으로 >"
          onPress={handleTeamDeleteCloseModal}
        />
      </CommonModal>
      <CommonModal visible={lastWarnVisible} setVisible={handleLastWarnCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>마지막 경고에요</Bold>
          <Line>
            <Regular gray size={13}>
              삭제된 팀은 복구가 불가능 합니다. 정말 팀을 삭제 하시겠습니까?
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="이전 화면으로 >" onPress={handleLastWarnCloseModal} />
        <Space />
        <CommonModalButton color="whiteSmoke" text="팀 삭제하기" onPress={removeTeam} />
      </CommonModal>
      <CommonModal visible={leaveTeamVisible} setVisible={handleLeaveTeamCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>팀 나가기</Bold>
          <Line>
            <Regular gray size={13}>
              팀을 나가면 알림을 받을 수 없습니다. 계속 진행 하시겠습니까?
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="팀 나가기" onPress={handleLastLeaveTeamOpenModal} />
        <Space />
        <CommonModalButton
          color="whiteSmoke"
          text="이전 화면으로 >"
          onPress={handleLeaveTeamCloseModal}
        />
      </CommonModal>
      <CommonModal visible={lastLeaveTeamVisible} setVisible={handleLastLeaveTeamCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>마지막 경고에요</Bold>
          <Line>
            <Regular gray size={13}>
              팀에 다시 들어오려면 초대코드를 입력해야 합니다. 정말 나가시겠습니까?
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton
          color="blue"
          text="이전 화면으로 >"
          onPress={handleLastLeaveTeamCloseModal}
        />
        <Space />
        <CommonModalButton color="whiteSmoke" text="팀 나가기" onPress={leaveTeam} />
      </CommonModal>
      <CommonModal visible={expulsionVisible} setVisible={handleExpulsionCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>강퇴하기</Bold>
          <Line>
            <Regular gray size={13}>
              팀에서 강퇴 하시겠습니까?
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton color="blue" text="강퇴하기" onPress={expulsionMember} />
        <Space />
        <CommonModalButton
          color="whiteSmoke"
          text="이전 화면으로 >"
          onPress={handleExpulsionCloseModal}
        />
      </CommonModal>
      <ContentTitleBox>
        <ContentRole>
          <Regular size={13}>역할</Regular>
        </ContentRole>
        <ContentName>
          <Regular size={13}>이름</Regular>
        </ContentName>
        <ContentPhone>
          <Regular size={13}>전화번호</Regular>
        </ContentPhone>
        <ContentAction>
          <Regular size={13}>팀 행동</Regular>
        </ContentAction>
      </ContentTitleBox>
      {data.users.map((el) =>
        data.leaderId === id ? (
          <ContentTitleBox key={el.id}>
            <ContentRole>
              {data.leaderId === el.id ? (
                <CaptainMark />
              ) : (
                <RadioButton.Android
                  value={String(el.id)}
                  status={newLeaderId === el.id ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioButton(el.id)}
                />
              )}
            </ContentRole>
            <ContentName>
              <Regular size={16}>{el.name}</Regular>
            </ContentName>
            <ContentPhone>
              <Regular size={16}>{el.phone}</Regular>
            </ContentPhone>
            <ContentAction>
              {data.leaderId === el.id ? (
                <TeamDeleteText onPress={handleTeamDeleteOpenModal}>팀 삭제하기</TeamDeleteText>
              ) : newLeaderId === el.id ? (
                <MemberRejectionText onPress={() => handleExpulsionOpenModal(el.id)}>
                  강퇴하기
                </MemberRejectionText>
              ) : (
                <></>
              )}
            </ContentAction>
          </ContentTitleBox>
        ) : (
          <ContentTitleBox key={el.id}>
            <ContentRole>
              {data.leaderId === el.id ? <CaptainMark /> : <Regular size={13}>팀원</Regular>}
            </ContentRole>
            <ContentName>
              <Regular size={16}>{el.name}</Regular>
            </ContentName>
            <ContentPhone>
              <Regular size={16}>{el.phone}</Regular>
            </ContentPhone>
            <ContentAction>
              {id === el.id ? (
                <TeamDeleteText onPress={handleLeaveTeamOpenModal}>팀 나가기 {'>'}</TeamDeleteText>
              ) : (
                <></>
              )}
            </ContentAction>
          </ContentTitleBox>
        ),
      )}
    </>
  );
}
