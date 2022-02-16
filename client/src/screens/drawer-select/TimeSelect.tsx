import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { createRef, useEffect, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { ListType } from '../../../@types/global/types';
import CommonModalButton from '../../components/button/CommonModalButton';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import ListPicker from '../../components/input/ListPicker';
import ListItem from '../../components/view/ListItem';
import checkOverMidnight from '../../functions/checkOverMidnight';
import useProps from '../../hooks/useProps';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { addScheduleManage } from '../../store/actions/propsAction';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';

const TimeContainer = styled.View`
  height: 300px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
`;

const ButtonContainer = styled.View`
  height: 60px;
  width: 100%;
`;

const TitleContainer = styled.View`
  margin-top: 20px;
`;

const Wrapper = styled.View`
  padding: 0px 30px;
`;

const BoldText = styled(Bold)`
  color: ${colors.blue};
  font-size: 20px;
  flex-shrink: 0;
`;

type TimeSelectProps = StackScreenProps<RootStackParamList, 'TimeSelect'>;

export default function TimeSelect({ route }: TimeSelectProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const hoursRef = createRef<FlatList>();
  const minutesRef = createRef<FlatList>();
  const dispatch = useDispatch();

  const {
    scheduleManage: { startTime, endTime },
  } = useProps();
  const [hourIndex, setHourIndex] = useState<number>(-1);
  const [minuteIndex, setMinuteIndex] = useState<number>(-1);
  const [selectedTime, setSelectedTime] = useState('');

  const getHours = (time?: string) => {
    const end = 24;
    const start = time ? parseInt(time.split(':')[0]) : 0;
    const range = [...Array(end - start).keys()].map((hour) =>
      `${hour + start}`.length === 1 ? { value: `0${hour + start}` } : { value: `${hour + start}` },
    );
    if (start !== 0) {
      range.push(
        ...[...Array(start).keys()].map((hour) =>
          `${hour}`.length === 1 ? { value: `0${hour}` } : { value: `${hour}` },
        ),
      );
    }
    if (endTime) {
      return [...range.slice(1, range.length), range[0]].reverse();
    }
    return range;
  };

  const hours: ListType[] = getHours(startTime || endTime);
  const minutes: ListType[] = [...Array(60).keys()]
    .filter((minute) => minute % 5 === 0)
    .map((minute) => (`${minute}`.length === 1 ? { value: `0${minute}` } : { value: `${minute}` }));

  const pressHour = (index: number) => {
    hoursRef.current?.scrollToIndex({ animated: true, index: index - 2 });
    setHourIndex(index);
  };

  useEffect(() => {
    if (hourIndex > 0 && minuteIndex > 0) {
      setSelectedTime(`${hours[hourIndex - 2]['value']}:${minutes[minuteIndex - 2]['value']}`);
    }
  }, [hours, minutes, hourIndex, minuteIndex]);

  const pressMinute = (index: number) => {
    minutesRef.current?.scrollToIndex({ animated: true, index: index - 2 });
    setMinuteIndex(index);
  };

  const checkValid = () => {
    if (selectedTime.length === 0) {
      return false;
    }
    return true;
  };

  const getNavigation = () => {
    if (route.params?.time === 'start') {
      dispatch(addScheduleManage({ startTime: selectedTime }));
      navigation.navigate('ScheduleManage_1');
    } else if (route.params?.time === 'end') {
      dispatch(addScheduleManage({ endTime: selectedTime }));
      navigation.navigate('ScheduleManage_1');
    }
  };

  const renderHours: ListRenderItem<{ value: string }> = ({ item: { value }, index }) => (
    <ListItem
      index={index}
      selectedIdx={hourIndex}
      length={hours.length}
      onPress={() => pressHour(index)}
      text={value}
    />
  );

  const renderMinutes: ListRenderItem<{ value: string }> = ({ item: { value }, index }) => (
    <ListItem
      index={index}
      selectedIdx={minuteIndex}
      length={minutes.length}
      onPress={() => pressMinute(index)}
      text={value}
    />
  );

  const scrollHoursCenter = () => {
    hoursRef.current?.scrollToIndex({ animated: true, index: hours.length / 2 });
  };

  const scrollMinutesCenter = () => {
    minutesRef.current?.scrollToIndex({ animated: true, index: minutes.length / 2 });
  };

  const getMinuteIndex = (time?: string) => {
    const splitted = time && time.split(':')[1];
    if (splitted) {
      return minutes.findIndex((el) => el.value === splitted);
    }
    return minutes.length / 2;
  };

  const scrollMinutesIndex = () => {
    minutesRef.current?.scrollToIndex({
      animated: true,
      index: getMinuteIndex(startTime || endTime),
    });
  };

  const scrollHours = () => {
    if (route.params?.time === 'start') {
      if (!endTime) {
        scrollHoursCenter();
      }
    } else if (route.params?.time === 'end') {
      if (!startTime) {
        scrollHoursCenter();
      }
    }
  };

  const scrollMinutes = () => {
    if (route.params?.time === 'start') {
      if (endTime) {
        scrollMinutesIndex();
      } else {
        scrollMinutesCenter();
      }
    } else if (route.params?.time === 'end') {
      if (startTime) {
        scrollMinutesIndex();
      } else {
        scrollMinutesCenter();
      }
    }
  };

  const getNextDay = () => {
    if (route.params?.time === 'end') {
      return checkOverMidnight(startTime, selectedTime);
    }
  };

  return (
    <BottomDrawer>
      <Wrapper>
        <TitleContainer>
          <Bold size={22}>{route.params?.time === 'start' ? '시작' : '종료'} 시간</Bold>
        </TitleContainer>
        <TimeContainer>
          {getNextDay() && <BoldText>익일</BoldText>}
          <ListPicker
            isInverted={Boolean(endTime)}
            scrollCenter={scrollHours}
            ref={hoursRef}
            data={hours}
            renderItem={renderHours}
          />
          {checkValid() ? (
            <Bold size={20} blue>
              :
            </Bold>
          ) : (
            <Regular size={20} lightGray>
              :
            </Regular>
          )}
          <ListPicker
            scrollCenter={scrollMinutes}
            ref={minutesRef}
            data={minutes}
            renderItem={renderMinutes}
          />
        </TimeContainer>
        <ButtonContainer>
          <CommonModalButton
            onPress={() => getNavigation()}
            disabled={!checkValid()}
            color="blue"
            text="선택하기  >"
          />
        </ButtonContainer>
      </Wrapper>
    </BottomDrawer>
  );
}
