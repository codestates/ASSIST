import React, { useState } from 'react';
import { TimePicker } from 'react-native-simple-time-picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import BottomDrawer from '../../components/drawer/BottomDrawer';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Light } from '../../theme/fonts';
import { colors } from '../../theme/colors';

const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonTitle = styled(Light)`
  color: ${colors.blue}
  font-size: 20px;
`;

export default function StartTimeSelect() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);

  const handleChange = (value: { hours: number; minutes: number }) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };

  const onPress = () => {
    navigation.navigate({
      name: 'ScheduleManage_1',
      params: {
        start: `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`,
      },
      merge: true,
    });
  };
  return (
    <BottomDrawer>
      <TimePicker value={{ hours, minutes }} onChange={handleChange} zeroPadding />
      <ButtonContainer onPress={() => onPress()}>
        <ButtonTitle>확인</ButtonTitle>
      </ButtonContainer>
    </BottomDrawer>
  );
}
