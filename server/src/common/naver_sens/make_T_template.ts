import {
  T001dto,
  T002dto,
  T003dto,
  T004dto,
  T005dto,
  T006dto,
  T007dto,
  T009dto,
} from './dto/template.dto';
import getHangleDate from './utlls/get_hangle_date';

export class MakeT {
  T011(to: string, data: T001dto) {
    let a = `[팀 가입 완료 안내]

풋살 팀 가입이 완료 되었어요 🎉🎉

︎◼︎ 팀 이름
     - ${data.team}

︎◼︎ 초대한 사람
     - ${data.leader} 주장님

︎◼︎ 팀 코드
     - ${data.code}

-----

${data.name}님의 즐겁고 간편한 풋살 라이프, 저희가 어시스트(Assist) 해 드릴게요!

  1. 앞으로 팀에 경기가 생기면 알려드려요.
  2. 팀 회비 납부 전날 알려드려요.
  3. 그 외에 팀과 관련된 소식을 알려드려요.`;

    const buttons = [
      {
        type: 'WL',
        name: '팀 정보 보기',
        linkMobile: `${process.env.HOMEPAGE_URL}/User/Team/${data.teamId}`,
        linkPc: `${process.env.HOMEPAGE_URL}/User/Team/${data.teamId}`,
      },
    ];
    //추후 버튼추가
    return { to, content: a, buttons };
  }

  T002(to: string, data: T002dto) {
    const content = `아래 선수가 팀에 가입했어요 🎉🎉︎
    
◼︎ 팀 이름
- ${data.team}

◼︎ 가입한 사람
- ${data.name}
           
◼︎ 가입 일자
- ${getHangleDate()}

** 해당 선수 가입 알림 메시지는 고객님의 알림 신청에 의해 발송된 메시지입니다.`;

    const buttons = [
      {
        type: 'WL',
        name: '팀 구성원 확인하기',
        linkMobile: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
        linkPc: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
      },
    ];
    return { to, content, buttons };
  }

  T003(to: string, data: T003dto) {
    const content = `주장 위임이 완료 되었습니다.

◼︎ 팀 이름
- ${data.team}
      
◼︎ 새로운 주장
- ${data.leader} 님
      
** 앞으로 어시스트를 통한 일정 생성, 팀원강퇴 등은 새로운 주장님만 가능합니다.`;

    const buttons = [
      {
        type: 'WL',
        name: '팀 정보 확인하기',
        linkMobile: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
        linkPc: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
      },
    ];
    return { to, content, buttons };
  }

  T004(to: string, data: T004dto) {
    const content = `팀의 주장으로 임명 되었습니다. 축하드립니다!

◼︎ 팀 이름
- ${data.team}
      
◼︎ 기존 주장
- ${data.leader} 님
      
** 주장에 임명된 이유는 이전 주장님께 문의 해 주세요.`;

    const buttons = [
      {
        type: 'WL',
        name: '팀 정보 확인하기',
        linkMobile: `${process.env.HOMEPAGE_URL}/User/Team/${data.teamId}`,
        linkPc: `${process.env.HOMEPAGE_URL}/User/Team/${data.teamId}`,
      },
    ];
    return { to, content, buttons };
  }

  T005(to: string, data: T005dto) {
    const content = `아래 팀이 삭제 되어 팀에서 탈퇴 되었습니다.

◼︎ 팀 이름
- ${data.team}
      
◼︎ 팀 삭제 일자
- ${getHangleDate()}
      
** 팀 삭제 사유는 해당 팀 주장님께 문의 해 주세요.
** 어시스트 서비스에서 탈퇴된 것이 아니므로, 다른 팀의 활동은 가능합니다.`;
    const buttons = [
      {
        type: 'WL',
        name: '어시스트 홈페이지로',
        linkMobile: `${process.env.HOMEPAGE_URL}`,
        linkPc: `${process.env.HOMEPAGE_URL}`,
      },
    ];
    return { to, content, buttons };
  }

  T016(to: string, data: T006dto) {
    const content = `아래 팀원이 팀을 나갔습니다.

◼︎ 팀 이름
- ${data.team}
      
◼︎ 팀원 이름
- ${data.name} 님
      
◼︎ 팀 탈퇴 일자
- ${getHangleDate()}
      
** 팀을 나간 이유는 팀원에게 직접 문의 해 주세요.`;

    const buttons = [
      {
        type: 'WL',
        name: '팀 구성원 확인하기',
        linkMobile: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
        linkPc: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
      },
    ];

    return { to, content, buttons };
  }

  T007(to: string, data: T007dto) {
    const content = `아래 팀원을 강퇴하였습니다.

◼︎ 팀 이름
- ${data.team}
      
◼︎ 강퇴된 팀원 이름
- ${data.name}
      
◼︎ 강퇴 일자
- ${getHangleDate()}`;

    const buttons = [
      {
        type: 'WL',
        name: '팀 구성원 확인하기',
        linkMobile: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
        linkPc: `${process.env.HOMEPAGE_URL}/User/AddOns_2/${data.teamId}`,
      },
    ];
    return { to, content, buttons };
  }

  T008(to: string, data: T005dto) {
    const content = `아래 팀에서 강퇴되었습니다.

◼︎ 팀 이름
- ${data.team}
      
◼︎ 팀 강퇴 일자
- ${getHangleDate()}
      
** 정확한 강퇴 사유는 해당 팀 주장님께 문의 해 주세요.`;

    const buttons = [
      {
        type: 'WL',
        name: '어시스트 홈페이지로',
        linkMobile: `${process.env.HOMEPAGE_URL}`,
        linkPc: `${process.env.HOMEPAGE_URL}`,
      },
    ];
    return { to, content, buttons };
  }

  T009(to: string, data: T009dto) {
    const content = `내일은 [${data.team}] 팀의 회비 납부일 입니다.
팀을 위해 늦지 않게 납부 해 주세요 🙏
      
◼︎ 팀 이름
- ${data.team}
      
◼︎ 회비 납부일
- ${getHangleDate(data.date)}
      
◼︎ 납부 계좌 정보
- ${data.bank} ${data.accountNumber}
      
** 정확한 납부 금액은 팀 주장 또는 총무님께 문의 해 주세요.`;

    const buttons = [
      {
        type: 'WL',
        name: '상세정보 확인',
        linkMobile: `${process.env.HOMEPAGE_URL}/User/Team/${data.teamId}`,
        linkPc: `${process.env.HOMEPAGE_URL}/User/Team/${data.teamId}`,
      },
    ];
    return { to, content, buttons };
  }
}
