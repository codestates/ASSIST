import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../navigation/RootStackParamList';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { StackScreenProps } from '@react-navigation/stack';
import next from '../../assets/images/next.png';
import prev from '../../assets/images/previous.png';

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

const IconLeft = styled.Image`
  width: 30px;
  height: 30px;
`;

const IconRight = styled.Image`
  width: 30px;
  height: 30px;
`;

type CalendarSelectProps = StackScreenProps<RootStackParamList, 'CalendarSelect'>;

export default function CalendarSelect({ route }: CalendarSelectProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <BottomDrawer>
      <Calendar
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
        renderArrow={(direction) =>
          direction === 'left' ? <IconLeft source={prev} /> : <IconRight source={next} />
        }
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
      />
    </BottomDrawer>
  );
}
