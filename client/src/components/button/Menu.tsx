import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import CaptainMark from '../mark/CaptainMark';

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 41px;
`;

const Mark = styled.View`
  position: absolute;
  right: 0;
  bottom: 5px;
`;

export default function Menu() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { leader } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  return (
    <Container onPress={() => navigation.navigate('MyPage')}>
      <Ionicons name="person-circle-outline" size={35} color={colors.blue} />
      {leader && (
        <Mark>
          <CaptainMark size="small" />
        </Mark>
      )}
    </Container>
  );
}
