import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import styled from 'styled-components/native';
import { Direction } from 'react-native-calendars/src/types';
import CommonModalButton from '../../components/button/CommonModalButton';
import getDayString from '../../functions/getDayString';

const Header = styled.View`
  margin-bottom: 17px;
`;

const Arrow = styled.View`
  margin-bottom: 15px;
`;

const Dot = styled(Regular)`
  font-size: 22px;
  margin: 0px 2px;
  color: ${colors.gray};
`;

const TitleContainer = styled.View`
  padding: 15px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.View`
  margin-top: 22px;
  padding: 0px 15px;
  height: 60px;
  width: 100%;
`;

const dayNamesShort = ['일', '월', '화', '수', '목', '금', '토'];
const monthNamesShort = [
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
];

LocaleConfig.locales['ko'] = {
  dayNames: dayNamesShort.map((day) => day + '요일'),
  dayNamesShort,
  monthNames: monthNamesShort,
  monthNamesShort,
};
LocaleConfig.defaultLocale = 'ko';

export default function CalendarSelect() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const currentTime = new Date();
  const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000;
  const koreaTime = String(new Date(utc + KR_TIME_DIFF));

  useEffect(() => {
    if (selectedDate.length > 0) {
      markDate();
    }
  }, [selectedDate]);

  const markDate = () => {
    const newObject: { [key: string]: { selected: boolean; selectedColor: string } } = {};
    newObject[`${selectedDate}`] = { selected: true, selectedColor: colors.blue };
    setMarkedDates(newObject);
  };

  const getMonth = (date?: LocaleConfig) => {
    if (!date) return;
    const time = date.toISOString().split('T')[0];
    const year = time.split('-')[0];
    const month = time.split('-')[1];
    return (
      <Header>
        <Regular size={17} gray>
          {year}
          <Dot>.</Dot>
          {month}
        </Regular>
      </Header>
    );
  };

  const getSelectedDate = () => {
    if (selectedDate.length > 0) {
      return (
        <Regular size={18} blue>
          {`${selectedDate} (${getDayString(selectedDate)})`}
        </Regular>
      );
    }
    return null;
  };

  const renderArrow = (direction: Direction) => (
    <Arrow>
      <MaterialIcons
        name={`arrow-${direction === 'left' ? 'back' : 'forward'}-ios`}
        size={20}
        color={colors.lightGray}
      />
    </Arrow>
  );

  const getNavigation = () => {
    navigation.navigate({
      name: 'ScheduleManage_1',
      params: { date: selectedDate },
      merge: true,
    });
  };

  return (
    <BottomDrawer>
      <TitleContainer>
        <Bold size={22}>경기 날짜</Bold>
        {getSelectedDate()}
      </TitleContainer>
      <Calendar
        onDayPress={({ dateString }) => {
          setSelectedDate(dateString);
        }}
        markedDates={markedDates}
        minDate={koreaTime}
        firstDay={1}
        renderArrow={renderArrow}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        renderHeader={(date) => getMonth(date)}
        theme={{
          textDayFontFamily: 'SpoqaHanSansNeo-Regular',
          textMonthFontFamily: 'SpoqaHanSansNeo-Regular',
          textDayHeaderFontFamily: 'SpoqaHanSansNeo-Regular',
          selectedDayTextColor: colors.white,
          todayTextColor: colors.blue,
          dayTextColor: colors.darkGray,
          textDisabledColor: colors.lightGray,
        }}
      />
      <ButtonContainer>
        <CommonModalButton
          onPress={() => getNavigation()}
          disabled={selectedDate === ''}
          color="blue"
          text="선택하기  >"
        />
      </ButtonContainer>
    </BottomDrawer>
  );
}
