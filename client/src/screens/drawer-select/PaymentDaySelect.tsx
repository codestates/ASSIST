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
import { Bold } from '../../theme/fonts';

const ItemContainer = styled.View`
  height: 300px;
  width: 100%;
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

type PaymentDaySelectProps = StackScreenProps<RootStackParamList, 'PaymentDaySelect'>;

export default function PaymentDaySelect({ route }: PaymentDaySelectProps) {
  const days: { value: string }[] = [...Array(31).keys()]
    .slice(1)
    .map((day) => {
      return { value: `${day}일` };
    })
    .concat({ value: '말일' });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const daysRef = createRef<FlatList>();
  const [dayIndex, setDayIndex] = useState<number>(-1);

  const pressDay = (index: number) => {
    daysRef.current?.scrollToIndex({ animated: true, index: index - 2 });
    setDayIndex(index);
  };

  const checkValid = () => {
    if (dayIndex < 0) {
      return false;
    }
    return true;
  };

  const getNavigation = () => {
    navigation.navigate({
      name: route.params.name,
      params: { paymentDay: days[dayIndex - 2]['value'] },
      merge: true,
    });
  };

  const renderDays: ListRenderItem<{ value: string }> = ({ item: { value }, index }) => (
    <ListItem
      index={index}
      selectedIdx={dayIndex}
      length={days.length}
      onPress={() => pressDay(index)}
      text={value}
    />
  );

  const scrollToCenter = () => {
    daysRef.current?.scrollToIndex({ animated: true, index: Math.floor(days.length / 2) });
  };

  return (
    <BottomDrawer>
      <Wrapper>
        <TitleContainer>
          <Bold size={22}>회비 납부일</Bold>
        </TitleContainer>
        <ItemContainer>
          <ListPicker
            scrollCenter={scrollToCenter}
            ref={daysRef}
            data={days}
            renderItem={renderDays}
          />
        </ItemContainer>
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
