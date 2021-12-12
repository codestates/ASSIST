/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import BottomDrawer from '../../components/drawer/BottomDrawer';
import { colors } from '../../theme/colors';
import { Bold, Light } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import CaptainMark from '../../components/mark/CaptainMark';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { ASSIST_SERVER_URL } from '@env';
import axios, { AxiosResponse } from 'axios';
import { getSelectedTeam, SelectedTeamType } from '../../store/actions/userAction';

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

type UserTeams = Array<{ id: number; name: string; leader: boolean }>;

export default function TeamSelect() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { token, selectedTeam } = useSelector((state: RootState) => state.userReducer);
  const [teams, setTeams] = useState<UserTeams>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserTeams().catch((error) => console.log(error));
    });
    return unsubscribe;
  }, [navigation]);

  const getUserTeams = async () => {
    try {
      const { data }: AxiosResponse<UserTeams> = await axios.get(`${ASSIST_SERVER_URL}/user/team`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToTeam = (team: SelectedTeamType) => {
    dispatch(getSelectedTeam(team));
    navigation.navigate('Home');
  };

  return (
    <BottomDrawer>
      <TitleContainer>
        <Title>팀 선택</Title>
      </TitleContainer>
      {teams.map((team) => (
        <TeamContainer key={team.id} onPress={() => goToTeam(team)}>
          <Team>{team.name}</Team>
          <IconContainer>
            {team.leader && <CaptainMark />}
            {team.id === selectedTeam.id && (
              <Check>
                <MaterialIcons name="check" size={20} color={colors.blue} />
              </Check>
            )}
          </IconContainer>
        </TeamContainer>
      ))}
      <TeamContainer onPress={() => navigation.navigate('CreateTeam')}>
        <NewTeam>+ 새로운 소속팀</NewTeam>
      </TeamContainer>
    </BottomDrawer>
  );
}
