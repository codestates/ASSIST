import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextButton from '../../components/button/NextButton';
import { RootState } from '../../store/reducers';
import axios, { AxiosResponse } from 'axios';
import { ASSIST_SERVER_URL } from '@env';
import getDayString from '../../functions/getDayString';
import checkOverMidnight from '../../functions/checkOverMidnight';
import checkStartTime from '../../functions/checkStartTime';
import CommonModalTitle from '../../components/text/CommonModalTitle';
import { CommonModal } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import SummaryView from '../../components/view/SummaryView';
import SummaryItem from '../../components/view/SummaryItem';
import useProps from '../../hooks/useProps';

export default function ScheduleManage_4() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    scheduleManage: { date, startTime, endTime, address, address2, deadline },
  } = useProps();
  const { token, selectedTeam } = useSelector((state: RootState) => state.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const checkDayPassing = () => {
    return checkOverMidnight(startTime, endTime);
  };

  const saveSchedule = () => {
    setIsLoading(true);
    axios
      .post(
        `${ASSIST_SERVER_URL}/match`,
        {
          date,
          startTime,
          endTime,
          address,
          address2,
          deadline: deadline[0],
          teamId: selectedTeam.id,
          daypassing: checkDayPassing(),
        },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )
      .then((res: AxiosResponse<{ id: number }>) => {
        navigation.navigate('ScheduleManage_5', { matchId: res.data.id });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const onPressNext = () => {
    if (checkStartTime(date, startTime)) {
      saveSchedule();
    } else {
      showErrorModal();
    }
  };

  const showErrorModal = () => {
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
    onPressTime();
  };

  const checkValid = () => {
    if (isLoading || modalVisible) {
      return false;
    }
    return true;
  };

  const dateValue = `${date} (${getDayString(date)})`;
  const timeValue = `?????? ${startTime} ??? ${checkDayPassing() ? '??????' : ''} ${endTime} ??????`;
  const deadlineValue = `?????? ?????? ${String(deadline[1])}??? ???`;

  const onPressTime = () => navigation.navigate('ScheduleManage_1');
  const onPressAddress = () => navigation.navigate('ScheduleManage_2');
  const onPressDeadline = () => navigation.navigate('ScheduleManage_3');

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle
          title="???? ??????????????? ?????? ??? ?????????."
          subtitle="????????? ????????? ????????? ?????? ??? ??? ?????????!"
        />
        <CommonModalButton text="????????????  >" onPress={hideErrorModal} />
      </CommonModal>
      <SummaryView>
        <SummaryItem title="?????????" value={dateValue} onPress={onPressTime} />
        <SummaryItem title="????????????" value={timeValue} onPress={onPressTime} />
        <SummaryItem title="??????" value={address} onPress={onPressAddress} />
        <SummaryItem title="????????????" value={address2} onPress={onPressAddress} />
        <SummaryItem title="????????????" value={deadlineValue} onPress={onPressDeadline} />
      </SummaryView>
      <NextButton disabled={!checkValid()} text="??? ????????? ????????????" onPress={onPressNext} />
    </>
  );
}
