import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import CaptainMark from '../mark/CaptainMark';
import { LayoutChangeEvent } from 'react-native';

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const Mark = styled.View`
  position: absolute;
  right: 0;
  bottom: 5px;
`;

type MenuProps = {
  onLayout?: (event: LayoutChangeEvent) => void;
};

export default function Menu({ onLayout }: MenuProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { leader } = useSelector((state: RootState) => state.userReducer.selectedTeam);

  const getMark = () => {
    if (leader) {
      return (
        <Mark>
          <CaptainMark size="small" />
        </Mark>
      );
    }
  };

  return (
    <Container onLayout={onLayout} onPress={() => navigation.navigate('MyPage')}>
      <Ionicons name="person-circle-outline" size={35} color={colors.blue} />
      {getMark()}
    </Container>
  );
}
