import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import CardScrollView from '../../components/view/CardScrollView';
import Card from '../../components/card/Card';
import { Bold, Regular } from '../../theme/fonts';
import { MaterialIcons } from '@expo/vector-icons';

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

export default function Home() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAll());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <CardScrollView home>
      <Card>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTeam')}>
          <Text>팀 등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('JoinTeam')}>
          <Text>팀 가입하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LendingPage')}>
          <Text>랜딩 페이지</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ScheduleManage')}>
          <Text>일정 관리</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MatchVote')}>
          <Text>인원 모집 중</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MercenaryInvite')}>
          <Text>용병 구하기</Text>
        </TouchableOpacity>
      </Card>
      <Card>
        <TitleView>
          <Bold size={19}>🛠 부가기능</Bold>
        </TitleView>
        <MenuView>
          <Regular size={13} gray>
            지난 경기 기록
          </Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuView>
        <MenuView>
          <Regular size={13} gray>
            팀 구성원
          </Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuView>
        <MenuView last>
          <Regular size={13} gray>
            팀 정보
          </Regular>
          <MaterialIcons name="keyboard-arrow-right" size={23} color={colors.gray} />
        </MenuView>
      </Card>
    </CardScrollView>
  );
}
