import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Bold } from '../../theme/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { useToast } from 'react-native-toast-notifications';
import { LayoutChangeEvent } from 'react-native';

const Container = styled.View`
  flex-direction: row;
  padding: 0px 20px;
  margin-bottom: 10px;
  height: 30px;
`;

const TeamSelector = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const TeamName = styled(Bold)`
  color: ${colors.blue};
  font-size: 17px;
  margin-right: 2px;
`;

type BottomContainerProps = {
  isNewTeam?: boolean;
  isTestSelect?: boolean;
  isTestTeam?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export default function BottomContainer({
  isNewTeam,
  isTestSelect,
  isTestTeam,
  onLayout,
}: BottomContainerProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { name } = useSelector((state: RootState) => state.userReducer.selectedTeam);
  const toast = useToast();

  const getTeamName = () => {
    if (isTestSelect || isNewTeam) {
      return '팀 선택';
    } else if (isTestTeam) {
      return 'FC 살쾡이';
    } else {
      return name;
    }
  };

  return (
    <Container>
      {
        <TeamSelector onPress={() => navigation.navigate('TeamSelect')}>
          <TeamName>{getTeamName()}</TeamName>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.blue} />
        </TeamSelector>
      }
      <TeamSelector onLayout={onLayout}>
        <TeamName
          onPress={() => toast.show('아직 준비 중인 기능입니다.')}
          style={{ color: colors.lightGray }}>
          용병활동
        </TeamName>
      </TeamSelector>
    </Container>
  );
}
