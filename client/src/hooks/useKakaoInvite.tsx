/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Platform } from 'react-native';

type useInviteKakaoProps = {
  teamName?: string;
  inviteCode?: string;
  leader?: string;
};

export default function useInviteKakao({ teamName, inviteCode, leader }: useInviteKakaoProps) {
  return () => {
    if (Platform.OS === 'web') {
      window.Kakao.Link.sendDefault({
        objectType: 'text',
        text: `[팀원 초대 메시지]
      
초대 메시지가 도착했습니다 📩
아래 버튼을 눌러 팀에 가입 해 보세요!
      
  ◼︎ 팀 이름
      - ${teamName || ''}
      
  ◼︎ 초대한 사람
      - ${leader || ''} 주장님
      
  ◼︎ 팀 코드
      - ${inviteCode || ''}`,
        link: {
          mobileWebUrl: `https://team-assist.kr/User/JoinTeam/JoinTeam_1/${inviteCode || ''}`,
          webUrl: `https://team-assist.kr/JoinTeam/JoinTeam_1/${inviteCode || ''}`,
        },
        buttons: [
          {
            title: '가입하러 가기',
            link: {
              mobileWebUrl: `https://team-assist.kr/User/JoinTeam/JoinTeam_1/${inviteCode || ''}`,
              webUrl: `https://team-assist.kr/User/JoinTeam/JoinTeam_1/${inviteCode || ''}`,
            },
          },
        ],
      });
    }
  };
}
