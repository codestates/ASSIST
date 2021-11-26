import React from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { colors } from '../../theme/colors';
import { Bold, Light } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import CaptainMark from '../../components/mark/CaptainMark';

const TitleContainer = styled.View`
  margin: 15px 0px;
`;
const Title = styled(Bold)`
  font-size: 20px;
`;
const TeamContainer = styled.TouchableOpacity`
  margin: 15px 0px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Team = styled(Light)`
  font-size: 15px;
`;
const NewTeam = styled(Bold)`
  font-size: 15px;
  color: ${colors.blue};
`;
const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Check = styled.View`
  margin-left: 20px;
`;

export default function TeamSelect() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <BottomDrawer>
      <TitleContainer>
        <Title>팀 선택</Title>
      </TitleContainer>
      <TeamContainer>
        <Team>FC 프론트</Team>
        <IconContainer>
          <CaptainMark />
          <Check>
            <MaterialIcons name="check" size={20} color={colors.blue} />
          </Check>
        </IconContainer>
      </TeamContainer>
      <TeamContainer>
        <Team>FC 백엔드</Team>
      </TeamContainer>
      <TeamContainer>
        <Team>FC 살쾡이</Team>
      </TeamContainer>
      <TeamContainer onPress={() => navigation.navigate('Home')}>
        <NewTeam>+ 새로운 소속팀</NewTeam>
      </TeamContainer>
    </BottomDrawer>
  );
}
