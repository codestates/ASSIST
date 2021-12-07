import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.whiteSmoke};
  justify-content: center;
  align-items: center;
  border-top-color: ${colors.lightGray};
  border-top-width: 1.5px;
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
    <Container>
      <Text>Home</Text>
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
    </Container>
  );
}
