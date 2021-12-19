import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { StackScreenProps } from '@react-navigation/stack';

LocaleConfig.locales['ko'] = {
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
};
LocaleConfig.defaultLocale = 'ko';

type CalendarSelectProps = StackScreenProps<RootStackParamList, 'CalendarSelect'>;

export default function CalendarSelect({ route }: CalendarSelectProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <BottomDrawer>
      <Calendar
        style={{ height: '100%' }}
        markingType={'dot'}
        onDayPress={(day) => {
          navigation.navigate({
            name: 'ScheduleManage_1',
            params: { date: day.dateString },
            merge: true,
          });
        }}
        minDate={String(new Date())}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
      />
    </BottomDrawer>
  );
}
