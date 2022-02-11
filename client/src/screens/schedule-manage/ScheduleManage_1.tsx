import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import LineSelect from '../../components/input/LineSelect';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';
import { addScheduleManage } from '../../store/actions/propsAction';
import checkOverMidnight from '../../functions/checkOverMidnight';
import getDayString from '../../functions/getDayString';
import { CommonModal } from '../../components/modal/CommonModal';
import CommonModalButton from '../../components/button/CommonModalButton';
import CommonModalTitle from '../../components/text/CommonModalTitle';
import checkStartTime from '../../functions/checkStartTime';
import useProps from '../../hooks/useProps';
import useLineSelect from '../../hooks/useLineSelect';

export default function ScheduleManage_1() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    scheduleManage: { startTime, endTime, date },
  } = useProps();

  const { isPressed: isCalendarPressed, onPress: onCalendarPress } = useLineSelect();
  const { isPressed: isStartTimePressed, onPress: onStartTimePress } = useLineSelect();
  const { isPressed: isEndTimePressed, onPress: onEndTimePress } = useLineSelect();

  const [errStartTime, setErrStartTime] = useState(startTime);
  const [errDate, setErrDate] = useState(date);
  const [modalVisible, setModalVisible] = useState(false);

  const getNextDay = (startTime: string, endTime: string) => {
    if (startTime && endTime) {
      if (checkOverMidnight(startTime, endTime)) {
        return `익일 ${endTime}`;
      } else {
        return endTime;
      }
    } else if (endTime) {
      return endTime;
    }
  };

  const handleCalendar = () => {
    onCalendarPress();
    navigation.navigate('CalendarSelect');
  };

  const handleStartTime = () => {
    onStartTimePress();
    navigation.navigate('TimeSelect', { time: 'start' });
  };

  const handleEndTime = () => {
    onEndTimePress();
    navigation.navigate('TimeSelect', { time: 'end' });
  };

  const getDate = () => {
    if (date) {
      return `${date} (${getDayString(date)})`;
    }
  };

  const showErrorModal = (date: string, startTime: string) => {
    setErrDate(date);
    setErrStartTime(startTime);
    setModalVisible(true);
  };

  const hideErrorModal = () => {
    setModalVisible(false);
  };

  const checkValid = () => {
    if (!date || !startTime || !endTime || (errDate === date && errStartTime === startTime)) {
      return false;
    }
    return true;
  };

  const goToNext = () => {
    navigation.navigate('ScheduleManage_2');
  };

  const onPressNext = () => {
    if (date && startTime && endTime) {
      if (checkStartTime(date, startTime)) {
        goToNext();
      } else {
        showErrorModal(date, startTime);
      }
    }
  };

  return (
    <>
      <CommonModal visible={modalVisible} setVisible={hideErrorModal}>
        <CommonModalTitle
          title="😱 경기시간을 확인 해 주세요."
          subtitle="지나간 시간에 경기를 생성 할 수 없어요!"
        />
        <CommonModalButton text="돌아가기  >" onPress={hideErrorModal} />
      </CommonModal>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            경기 일정<Light size={22}>을</Light>
          </Bold>
          <Light size={22}>입력해주세요 🗓</Light>
        </MainTitle>
        <LineSelect
          title="경기 날짜"
          placeholder="경기 날짜를 선택해주세요"
          isPressed={isCalendarPressed}
          selected={getDate()}
          onPress={() => handleCalendar()}
          reset={addScheduleManage({ date: '' })}
        />
        <LineSelect
          title="시작 시간"
          isPressed={isStartTimePressed}
          selected={startTime}
          onPress={() => handleStartTime()}
          reset={addScheduleManage({ startTime: '' })}
        />
        <LineSelect
          title="종료 시간"
          isPressed={isEndTimePressed}
          selected={getNextDay(startTime, endTime)}
          onPress={() => handleEndTime()}
          reset={addScheduleManage({ endTime: '' })}
        />
      </NextPageView>
      <NextButton disabled={!checkValid()} onPress={onPressNext} />
    </>
  );
}
