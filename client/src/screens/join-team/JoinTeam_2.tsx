import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light, Regular } from '../../theme/fonts';
import SkipButton from '../../components/button/SkipButton';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import { getSelectedTeam } from '../../store/actions/userAction';
import { CommonModal, CommonModalTitle } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
const Line = styled.View`
  margin-top: 13px;
  margin-bottom: 35px;
`;

const TeamName = styled.View`
  width: 100%;
  background-color: ${colors.whiteSmoke};
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-top: 65px;
`;

export default function JoinTeam_2() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { name, code } = useSelector((state: RootState) => state.propsReducer.joinTeam);
  const { token } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const showErrorModal = () => {
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
    navigation.navigate('JoinTeam_1', { reset: true });
  };

  const joinTeam = () => {
    axios
      .post(
        `${ASSIST_SERVER_URL}/team/join`,
        { code },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )
      .then(({ data: { id } }: AxiosResponse<{ id: number }>) => {
        dispatch(getSelectedTeam({ id, name, leader: false }));
        navigation.navigate('JoinTeam_3');
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 409) {
          showErrorModal();
        } else {
          navigation.navigate('NotFound');
        }
      });
  };

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle>
          <Bold size={17}>이미 가입된 팀입니다.</Bold>
          <Line>
            <Regular gray size={13}>
              가입 코드를 다시 한 번 확인 해주세요
            </Regular>
          </Line>
        </CommonModalTitle>
        <CommonModalButton text="돌아가기  >" onPress={hideErrorModal} />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <>
            <Bold size={22}>팀 이름</Bold>
            <Light size={22}>을</Light>
          </>
          <Light size={22}>확인해 주세요 👀</Light>
        </MainTitle>
        <TeamName>
          <Bold gray size={17}>
            {name}
          </Bold>
        </TeamName>
      </NextPageView>
      <SkipButton
        text="제 소속팀이 아니에요  >"
        onPress={() => navigation.navigate('JoinTeam_1', { reset: true })}
      />
      <NextButton onPress={() => joinTeam()} />
    </>
  );
}
