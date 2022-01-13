import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { createRef, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import styled from 'styled-components/native';
import CommonModalButton from '../../components/button/CommonModalButton';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import ListPicker from '../../components/input/ListPicker';
import ListItem from '../../components/view/ListItem';
import { RootStackParamList } from '../../navigation/RootStackParamList';
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

type TimeSelectProps = StackScreenProps<RootStackParamList, 'TimeSelect'>;

export default function TimeSelect({ route }: TimeSelectProps) {
  const hours: { value: string }[] = [...Array(24).keys()].map((hour) =>
    `${hour}`.length === 1 ? { value: `0${hour}` } : { value: `${hour}` },
  );
  const minutes: { value: string }[] = [...Array(60).keys()]
    .filter((minute) => minute % 5 === 0)
    .map((minute) => (`${minute}`.length === 1 ? { value: `0${minute}` } : { value: `${minute}` }));
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const hoursRef = createRef<FlatList>();
  const minutesRef = createRef<FlatList>();
  const [hourIndex, setHourIndex] = useState<number>(-1);
  const [minuteIndex, setMinuteIndex] = useState<number>(-1);

  const pressHour = (index: number) => {
    hoursRef.current?.scrollToIndex({ animated: true, index: index - 2 });
    setHourIndex(index);
  };

  const pressMinute = (index: number) => {
    minutesRef.current?.scrollToIndex({ animated: true, index: index - 2 });
    setMinuteIndex(index);
  };

  const checkValid = () => {
    if (hourIndex < 0 || minuteIndex < 0) {
      return false;
    }
    return true;
  };

  const getNavigation = () => {
    if (route.params?.time === 'start') {
      navigation.navigate({
        name: 'ScheduleManage_1',
        params: {
          startTime: `${hours[hourIndex - 2]['value']}:${minutes[minuteIndex - 2]['value']}`,
        },
        merge: true,
      });
    } else {
      navigation.navigate({
        name: 'ScheduleManage_1',
        params: {
          endTime: `${hours[hourIndex - 2]['value']}:${minutes[minuteIndex - 2]['value']}`,
        },
        merge: true,
      });
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

  return (
    <BottomDrawer>
      <Wrapper>
        <TitleContainer>
          <Bold size={22}>{route.params?.time === 'start' ? '시작' : '종료'} 시간</Bold>
        </TitleContainer>
        <TimeContainer>
          <ListPicker ref={hoursRef} data={hours} renderItem={renderHours} />
          {checkValid() ? (
            <Bold size={20} blue>
              :
            </Bold>
          ) : (
            <Regular size={20} lightGray>
              :
            </Regular>
          )}
          <ListPicker ref={minutesRef} data={minutes} renderItem={renderMinutes} />
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
