import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { useDispatch } from 'react-redux';
import { clearAll } from '../../store/actions/propsAction';
import CardScrollView from '../../components/view/CardScrollView';
import Card from '../../components/card/Card';
import AddOnsCard from '../../components/card/addOnsCard';
import AddTeamCard from '../../components/card/AddTeamCard';
import NoMatchCard from '../../components/card/NoMatchCard';
import NextMatchCard from '../../components/card/NextMatchCard';

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
      <NextMatchCard conditions="경기 확정" />
      <NextMatchCard conditions="투표 완료" />
      <NextMatchCard conditions="인원 모집 중" />
      <NoMatchCard />
      <AddTeamCard />
      <AddOnsCard />
    </CardScrollView>
  );
}
