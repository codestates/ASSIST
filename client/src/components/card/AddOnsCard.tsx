import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { colors } from '../../theme/colors';
import { Bold, Regular } from '../../theme/fonts';
import Card from './Card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const TitleView = styled.View`
  margin-bottom: 30px;
`;

const MenuView = styled.TouchableOpacity`
  margin-bottom: ${(props: { last?: boolean }) => (props.last ? '0px' : '20px')};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Container = styled.View`
  margin-top: 30px;
`;

export default function AddOnsCard() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { selectedTeam } = useSelector((state: RootState) => state.userReducer);
  return (
    <Container>
      <Card>
        <TitleView>
          <Bold size={19}>🛠 부가기능</Bold>
        </TitleView>
        <MenuView onPress={() => navigation.navigate('AddOns_1')}>
          <Regular size={13} gray>
            지난 경기 기록
          </Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuView>
        <MenuView
          onPress={() => navigation.navigate('AddOns_2', { teamId: String(selectedTeam.id) })}>
          <Regular size={13} gray>
            팀 구성원
          </Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuView>
        <MenuView last onPress={() => navigation.navigate('AddOns_3')}>
          <Regular size={13} gray>
            팀 정보
          </Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuView>
      </Card>
    </Container>
  );
}
