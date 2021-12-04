import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import NextPageView from '../../components/view/NextPageView';
import NextButton from '../../components/button/NextButton';
import LineSelect from '../../components/input/LineSelect';
import MainTitle from '../../components/text/MainTitle';
import { Bold, Light } from '../../theme/fonts';

type ScheduleManageProps = StackScreenProps<RootStackParamList, 'ScheduleManage_1'>;

export default function ScheduleManage_1({ route }: ScheduleManageProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [isCalendarPressed, setIsCalendarPressed] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isEndPressed, setIsEndPressed] = useState(false);

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

  const handleCalendar = () => {
    setIsCalendarPressed(true);
    navigation.navigate('CalendarSelect');
  };
  const handleStartTime = () => {
    setIsStartPressed(true);
    navigation.navigate('StartTimeSelect');
  };
  const handleEndTime = () => {
    setIsEndPressed(true);
    navigation.navigate('EndTimeSelect');
  };

  return (
    <>
      <NextPageView>
        <MainTitle>
          <Bold size={22}>
            경기 일정<Light size={22}>을</Light>
          </Bold>
          <Light size={22}>입력해주세요 🗓</Light>
        </MainTitle>
        <LineSelect
          title="경기 일정"
          isPressed={isCalendarPressed}
          selected={route.params?.calendar}
          onPress={() => handleCalendar()}
        />
        <LineSelect
          title="시작 시간"
          isPressed={isStartPressed}
          selected={route.params?.start}
          onPress={() => handleStartTime()}
        />
        <LineSelect
          title="종료 시간"
          isPressed={isEndPressed}
          selected={route.params?.end}
          onPress={() => handleEndTime()}
        />
      </NextPageView>
      <NextButton
        disabled={
          route.params?.calendar === undefined ||
          route.params?.start === undefined ||
          route.params?.end === undefined
        }
        onPress={() => {
          navigation.navigate('ScheduleManage_2');
        }}
      />
    </>
  );
}
