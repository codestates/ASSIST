import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Bold } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import CaptainMark from '../mark/CaptainMark';

const Container = styled.View`
  flex-direction: row;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

const TeamSelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-items: center;
  margin-right: 15px;
`;

const TeamName = styled(Bold)`
  color: ${colors.blue};
  font-size: 17px;
  margin-right: 5px;
`;

export default function BottomContainer() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { name, leader, id } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  return (
    <Container>
      {id >= 0 ? (
        <TeamSelector onPress={() => navigation.navigate('TeamSelect')}>
          <TeamName>{name}</TeamName>
          {leader && <CaptainMark size="small" />}
        </TeamSelector>
      ) : (
        <TeamSelector onPress={() => navigation.navigate('CreateTeam')}>
          <TeamName>+ 팀 추가</TeamName>
          <MaterialIcons name="keyboard-arrow-down" size={26} color={colors.blue} />
        </TeamSelector>
      )}
      <TeamSelector>
        <TeamName style={{ color: colors.lightGray }}>용병활동</TeamName>
      </TeamSelector>
    </Container>
  );
}
