import { Platform } from 'expo-modules-core';
import { Linking } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

type useInviteSmsProps = {
  teamName?: string;
  inviteCode?: string;
  leader?: string;
};

export default function useInviteSms({ teamName, inviteCode, leader }: useInviteSmsProps) {
  const toast = useToast();
  const getSmsDivider = () => (Platform.OS === 'ios' ? '&' : '?');
  return async () => {
    try {
      await Linking.openURL(`sms:${getSmsDivider()}body=[팀원 초대 메시지]
      
      초대 메시지가 도착했습니다 📩
      아래 버튼을 눌러 팀에 가입 해 보세요!
            
        ◼︎ 팀 이름
            - ${teamName || ''}
            
        ◼︎ 초대한 사람
            - ${leader || ''} 주장님
            
        ◼︎ 팀 코드
            - ${inviteCode || ''}`);
    } catch (error) {
      toast.show('해당 플랫폼에서 지원하지 않는 기능입니다.');
      console.log(error);
    }
  };
}
