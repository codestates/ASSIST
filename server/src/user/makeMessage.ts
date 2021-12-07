export interface IMessage {
  countryCode?: string;
  to: string;
  content: string;
  buttons?: IButton;
  useSmsFailover?: boolean;
  failoverConfig?: any;
}

export interface IButton {
  type: string;
  name: string;
  linkMobile?: string;
  linkPc?: string;
  schemeIos?: string;
  schemeAndroid?: string;
}
export interface AlimTalkMessageRequest {
  templateCode: string;
  plusFriendId: string;
  messages: IMessage[];
  scheduleCode?: string;
  reserveTime?: string;
  reserveTimeZone?: string;
}

export function MakeMessage(
  code,
  info: {
    phone: string;
    team: string;
    leader: string;
    code: string;
    name: string;
  },
): AlimTalkMessageRequest {
  let body: AlimTalkMessageRequest;
  if (code === 'T001') {
    let { phone, team, leader, code, name } = info;
    if (!phone || !team || !leader || !code || !name) throw 'parameter err';

    phone = phone.replace(/-/g, '');
    body = {
      templateCode: 'T001',
      plusFriendId: '@assist',
      messages: [
        {
          to: phone,
          content: `[팀 가입 완료 안내]
      
      풋살 팀 가입이 완료 되었어요 🎉🎉
      
      ︎◼︎ 팀 이름
           - ${team}
      
      ︎◼︎ 초대한 사람
           - ${leader} 주장님
      
      ︎◼︎ 팀 코드
           - ${code}
      
      -----
      
      ${name}님의 즐겁고 간편한 풋살 라이프, 저희가 어시스트(Assist) 해 드릴게요!
      
        1. 앞으로 팀에 경기가 생기면 알려드려요.
        2. 팀 회비 납부 전날 알려드려요.
        3. 그 외에 팀과 관련된 소식을 알려드려요.`,
        },
      ],
    };
  }
  return body;
}
