/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NavigationContainer, Route } from '@react-navigation/native';
import LoggedInNav from './src/navigation/LoggedInNav';
import LoggedOutNav from './src/navigation/LoggedOutNav';
import * as Linking from 'expo-linking';
import { createStackNavigator } from '@react-navigation/stack';
import QuickTipsNav from './src/navigation/QuickTipsNav';
import IntroPageNav from './src/navigation/IntroPageNav';
import NotFound from './src/screens/main/NotFound';
import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import TeamTipsNav from './src/navigation/TeamTipsNav';

export default function Navigation() {
  const prefix = Linking.createURL('/');
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Intro: {
          path: 'Intro',
          screens: { Intro: 'IntroPage_1' },
        },
        QuickTips: {
          path: 'QuickTips',
          screens: { QuickTips: 'QuickTips_1' },
        },
        User: {
          path: 'User',
          screens: {
            BankSelect: 'BankSelect',
            Team: 'Team/:teamId',
            MatchVote: {
              path: 'MatchVote/:matchId',
              screens: {
                MatchVote_Main: 'MatchVote_Main',
                MatchVote_6: 'MatchVote_6',
              },
            },
            JoinTeam: {
              path: 'JoinTeam',
              screens: {
                JoinTeam_1: 'JoinTeam_1/:inviteCode',
              },
            },
            ScheduleManage: {
              path: 'ScheduleManage',
              screens: {
                ScheduleManage_2: 'ScheduleManage_2',
                ScheduleManage_4: 'ScheduleManage_4',
                StadiumSelect: 'StadiumSelect',
              },
            },
            AddOns_2: 'AddOns_2/:teamId',
            AddOns_1: 'AddOns_1',
          },
        },
        Guest: {
          path: 'Guest',
          screens: { Lobby: 'Lobby' },
        },
        NotFound: {
          path: 'NotFound',
          screens: { NotFound: 'NotFound' },
        },
      },
    },
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 404) {
        await Linking.openURL('/NotFound');
      }
      return Promise.reject(error.response);
    },
  );

  const rootNavigator = createStackNavigator();

  const formatter = (options?: Record<string, any>, route?: Route<string, object | undefined>) => {
    const name = route?.name && route.name.split('_')[0];
    if (Platform.OS !== 'web') {
      return 'ASSIST';
    } else if (name === 'Lobby' || name === 'Guest') {
      return '편리한 풋살팀 관리 ASSIST';
    } else if (name === 'GetStarted') {
      if (route?.name === 'GetStarted_Login') {
        return '로그인 | ASSIST';
      } else if (route?.name === 'GetStarted' || route?.name === 'GetStarted_1') {
        return '시작하기 | ASSIST';
      }
      return '회원가입 | ASSIST';
    } else if (name === 'FindPassword') {
      return '비밀번호 찾기 | ASSIST';
    } else if (name === 'CreateOrJoin') {
      return '팀 추가 | ASSIST';
    } else if (name === 'TeamSelect') {
      return '팀 선택 | ASSIST';
    } else if (name === 'MyPage') {
      return '마이페이지 | ASSIST';
    } else if (name === 'NewPhone') {
      return '번호 변경 | ASSIST';
    } else if (name === 'MyProfile') {
      return '내 프로필 | ASSIST';
    } else if (name === 'CustomerService') {
      return '고객센터 | ASSIST';
    } else if (name === 'LogOutSelect') {
      return '로그아웃 | ASSIST';
    } else if (name === 'CreateTeam') {
      return '팀 등록 | ASSIST';
    } else if (name === 'ScheduleManage') {
      return '경기 등록 | ASSIST';
    } else if (name === 'CalendarSelect') {
      return '날짜 선택 | ASSIST';
    } else if (name === 'BankSelect') {
      return '은행 선택 | ASSIST';
    } else if (name === 'TimeSelect') {
      return '시간 선택 | ASSIST';
    } else if (name === 'StadiumSelect') {
      return '경기장 선택 | ASSIST';
    } else if (name === 'VoteSelect') {
      return '투표하기 | ASSIST';
    } else if (name === 'PaymentDaySelect') {
      return '납부일 선택 | ASSIST';
    } else if (name === 'ConfirmSelect') {
      return '경기 확정 | ASSIST';
    } else if (name === 'GenderSelect') {
      return '성별 선택 | ASSIST';
    } else if (name === 'CancelSelect') {
      return '경기 취소 | ASSIST';
    } else if (name === 'DeleteAccount') {
      return '탈퇴하기 | ASSIST';
    } else if (name === 'IntroPage') {
      return '서비스 소개 | ASSIST';
    } else if (name === 'NotFound') {
      return '404 Error | ASSIST';
    } else if (name === 'JoinTeam') {
      return '팀 가입 | ASSIST';
    } else if (name === 'MercenaryInvite') {
      return '용병 초대 | ASSIST';
    } else if (name === 'QuickTips' || name === 'TeamTips') {
      return '사용 안내 | ASSIST';
    } else if (route?.name === 'AddOns_1') {
      return '지난 경기 기록 | ASSIST';
    } else if (route?.name === 'AddOns_2') {
      return '팀 구성원 | ASSIST';
    } else if (route?.name === 'AddOns_3') {
      return '팀 정보 | ASSIST';
    } else if (route?.name === 'AddOns_4') {
      return '팀원 초대 | ASSIST';
    } else if (route?.name === 'MatchVote_1') {
      return '경기 정보 | ASSIST';
    } else if (route?.name === 'MatchVote_2') {
      return '투표 완료 | ASSIST';
    } else if (route?.name === 'MatchVote_3') {
      return '경기 확정 | ASSIST';
    } else if (route?.name === 'MatchVote_4') {
      return '경기 취소 | ASSIST';
    } else if (route?.name === 'MatchVote_5') {
      return '경기 완료 | ASSIST';
    } else if (route?.name === 'MatchVote_6') {
      return '참석 투표 현황 | ASSIST';
    }
    return 'ASSIST';
  };

  return (
    <NavigationContainer
      linking={linking}
      documentTitle={{
        formatter,
      }}>
      <rootNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <rootNavigator.Screen name="Guest" component={LoggedOutNav} />
        <rootNavigator.Screen name="Intro" component={IntroPageNav} />
        <rootNavigator.Screen name="QuickTips" component={QuickTipsNav} />
        <rootNavigator.Screen name="TeamTips" component={TeamTipsNav} />
        <rootNavigator.Screen name="User" component={LoggedInNav} />
        <rootNavigator.Screen name="NotFound" component={NotFound} />
      </rootNavigator.Navigator>
    </NavigationContainer>
  );
}
