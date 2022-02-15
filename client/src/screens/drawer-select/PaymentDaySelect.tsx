import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { createRef, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import CommonModalButton from '../../components/button/CommonModalButton';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import ListPicker from '../../components/input/ListPicker';
import ListItem from '../../components/view/ListItem';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { addAddOns, addCreateTeam } from '../../store/actions/propsAction';
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const days: { value: string }[] = [...Array(31).keys()]
    .slice(1)
    .map((day) => {
      return { value: `${day}일` };
    })
    .concat({ value: '말일' });
  const daysRef = createRef<FlatList>();
  const [dayIndex, setDayIndex] = useState<number>(-1);
  const dispatch = useDispatch();

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

  const getDate = (value?: string) => {
    if (!value) {
      return 0;
    } else if (value === '말일') {
      return 32;
    }
    return Number(value?.slice(0, value.length - 1));
  };

  const getNavigation = () => {
    const paymentDay = getDate(days[dayIndex - 2]['value']);
    const screenName = route.params.name;
    if (screenName === 'CreateTeam_2') {
      dispatch(addCreateTeam({ paymentDay }));
    } else if (screenName === 'AddOns_3') {
      dispatch(addAddOns({ paymentDay }));
    }
    navigation.navigate(screenName);
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
            onPress={getNavigation}
            disabled={!checkValid()}
            color="blue"
            text="선택하기  >"
          />
        </ButtonContainer>
      </Wrapper>
    </BottomDrawer>
  );
}
