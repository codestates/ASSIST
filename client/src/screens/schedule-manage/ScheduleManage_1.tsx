import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
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

type ScheduleManageProps = StackScreenProps<RootStackParamList, 'ScheduleManage_1'>;

export default function ScheduleManage_1({ route }: ScheduleManageProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [isCalendarPressed, setIsCalendarPressed] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isEndPressed, setIsEndPressed] = useState(false);
  const [endTime, setEndTime] = useState('');
  const [errStartTime, setErrStartTime] = useState(route.params?.startTime);
  const [errDate, setErrDate] = useState(route.params?.date);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (isCalendarPressed) {
        setIsCalendarPressed(false);
      }
      if (isStartPressed) {
        setIsStartPressed(false);
      }
      if (isEndPressed) {
        setIsEndPressed(false);
      }
    });
    return unsubscribe;
  }, [navigation, isCalendarPressed, isStartPressed, isEndPressed]);

  useEffect(() => {
    getNextDay();
  }, [route.params?.startTime, route.params?.endTime]);

  const getNextDay = () => {
    if (route.params?.startTime && route.params?.endTime) {
      if (checkOverMidnight(route.params?.startTime, route.params?.endTime)) {
        setEndTime(`익일 ${route.params?.endTime}`);
      } else {
        setEndTime(route.params.endTime);
      }
    } else if (route.params?.endTime) {
      setEndTime(route.params.endTime);
    }
  };

  const handleCalendar = () => {
    setIsCalendarPressed(true);
    navigation.navigate('CalendarSelect');
  };

  const handleStartTime = () => {
    setIsStartPressed(true);
    navigation.navigate('TimeSelect', { time: 'start', endTime: route.params?.endTime });
  };

  const handleEndTime = () => {
    setIsEndPressed(true);
    navigation.navigate('TimeSelect', { time: 'end', startTime: route.params?.startTime });
  };

  const getDate = () => {
    if (route.params?.date) {
      return `${route.params.date} (${getDayString(route.params.date)})`;
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
    if (
      route.params?.date === undefined ||
      route.params?.startTime === undefined ||
      route.params?.endTime === undefined ||
      (errDate === route.params?.date && errStartTime === route.params.startTime)
    ) {
      return false;
    }
    return true;
  };

  const goToNext = () => {
    dispatch(
      addScheduleManage({
        date: String(route.params?.date),
        startTime: String(route.params?.startTime),
        endTime: String(route.params?.endTime),
      }),
    );
    navigation.navigate('ScheduleManage_2');
  };

  const onPressNext = () => {
    if (route.params?.date && route.params.startTime && route.params.endTime) {
      if (checkStartTime(route.params.date, route.params.startTime)) {
        goToNext();
      } else {
        showErrorModal(route.params.date, route.params.startTime);
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
        />
        <LineSelect
          title="시작 시간"
          isPressed={isStartPressed}
          selected={route.params?.startTime}
          onPress={() => handleStartTime()}
        />
        <LineSelect
          title="종료 시간"
          isPressed={isEndPressed}
          selected={endTime}
          onPress={() => handleEndTime()}
        />
      </NextPageView>
      <NextButton disabled={!checkValid()} onPress={onPressNext} />
    </>
  );
}
