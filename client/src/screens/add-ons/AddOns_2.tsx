import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import MainTitle from '../../components/text/MainTitle';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import ColoredScrollView from '../../components/view/ColoredScrollView';
import CloseHeader from '../../components/header/CloseHeader';
import CommonModalButton from '../../components/button/CommonModalButton';
import NextButton from '../../components/button/NextButton';
import TeamMemberCard from '../../components/card/TeamMeberCard';
import { RootState } from '../../store/reducers';
import useTeamInfo from '../../hooks/useTeamInfo';
import LoadingView from '../../components/view/LoadingView';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import axios from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { useToast } from 'react-native-toast-notifications';
import useGoHome from '../../hooks/useGoHome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';

const HeaderSpaceButton = styled.View`
  width: 100%;
  height: 35px;
`;

const ButtonSpaceContents = styled.View`
  width: 100%;
  height: 35px;
`;

const Space = styled.View`
  width: 100%;
  height: 16px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

export default function AddOns_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { name, leader, id } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  const { token } = useSelector((state: RootState) => state.userReducer);
  const { nowLeaderId } = useSelector((state: RootState) => state.propsReducer.newLeader);
  const toast = useToast();
  const goHome = useGoHome();
  const { isLoading, data } = useTeamInfo();

  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = (data: string) => {
    console.log(data);
  };

  const handleLeaderOpenModal = () => {
    setModalVisible(true);
  };

  const handleLeaderCloseModal = () => {
    setModalVisible(false);
  };

  const handleChangeLeaderId = async (nowLeaderId: number) => {
    try {
      await axios.patch(
        `${ASSIST_SERVER_URL}/team/${id}`,
        {
          name: data?.name,
          leaderId: `${nowLeaderId}`,
          paymentDay: data?.paymentDay,
          accountNumber: data?.accountNumber,
          accountBank: data?.accountBank,
        },
        { headers: { authorization: `Bearer ${token}` } },
      );
      goHome;
      toast.show('주장 위임이 완료 되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <CommonModal visible={modalVisible} setVisible={handleLeaderCloseModal}>
        <CommonModalTitle>
          <Bold size={17}>주장 위임</Bold>
          <Line>
            <Regular gray size={13}>
              주장을 위임하시겠습니까?
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton
          color="blue"
          text="주장 위임 하기"
          onPress={() => handleChangeLeaderId(nowLeaderId)}
        />
        <Space />
        <CommonModalButton
          color="whiteSmoke"
          text="이전 화면으로 >"
          onPress={handleLeaderCloseModal}
        />
      </CommonModal>
      <CloseHeader color={colors.whiteSmoke} />
      <ColoredScrollView titleColor={colors.whiteSmoke}>
        <MainTitle marginBottom="15px">
          <Bold size={22}>팀 구성원</Bold>
          <Regular size={17}>{name}</Regular>
        </MainTitle>
        <ContentContainer>
          <HeaderSpaceButton />
          <CommonModalButton
            disabled={!leader}
            color="blue"
            text="+ 팀원 초대하기"
            onPress={() => navigation.navigate('AddOns_4', { inviteCode: data?.inviteCode })}
          />
          <ButtonSpaceContents />
          <TeamMemberCard nowLeaderId={data?.leaderId} />
        </ContentContainer>
      </ColoredScrollView>
      <NextButton
        disabled={!leader}
        text="주장 위임 하기 >"
        onPress={() => {
          handleLeaderOpenModal();
        }}
      />
    </>
  );
}
