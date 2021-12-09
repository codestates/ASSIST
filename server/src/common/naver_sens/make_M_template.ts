import {
  M001dto,
  M002dto,
  M003dto,
  M004dto,
  M005dto,
  M006dto,
  M007dto,
  M008dto,
  M009dto,
  M010dto,
} from './dto/template.dto';
import getHangleDate from './utlls/get_hangle_date';

export class MakeM {
  M001(data: M001dto) {
    const content = `${data.team}에 새로운 경기가 등록 되었어요 ⚽️
    지금 투표에 참여 해 보세요!
    
    ◼ 팀 이름
    - ${data.team}
    
    ◼︎ 경기 일자
    - ${getHangleDate(data.date)}
    
    ◼︎ 경기 시간
    - ${data.startTime} ~ ${data.endTime}
    
    ◼︎ 경기 장소
    - ${data.station}`;

    return { code: 'M001', content };
  }

  M002(data: M002dto) {
    const content = `${data.name.slice(
      1,
    )}님, 다음 풋살 경기 인원모집이 곧 마감됩니다 ⌛️
       팀원들이 ${data.name.slice(
         1,
       )}님의 답을 기다리고 있어요. 이제 참석 여부를 확정 해 주세요!
       
       ◼︎ 팀 이름
       - ${data.team}
       
       ◼︎ 경기 일자
       - ${getHangleDate(data.date)}
       
       ◼︎ 경기 시간
       - ${data.startTime} - ${data.endTime}
       
       ◼︎ 경기 장소
       - ${data.station}
       
       ◼︎ 모집 마감
       - ${getHangleDate(data.date)} (내일) ${data.deadline}
       
       —-
       
       ** 마감 까지 미정, 미응답인 경우 불참으로 처리 됩니다.
       ** 마감 후에도 참석 여부를 변경할 수 있습니다.`;

    return { code: 'M002', content };
  }

  M003(data: M003dto) {
    const content = `다음 풋살 경기 인원모집이 곧 마감됩니다 ⌛️
       혹시 참석 의사에 변동이 있다면, 지금 수정 해 주세요!
       
       ◼︎ 팀 이름
       - ${data.team}
       
       ◼︎ 경기 일자
       - ${getHangleDate(data.date)}
       
       ◼︎ 경기 시간
       - ${data.startTime} - ${data.endTime}
       
       ◼︎ 경기 장소
       - ${data.station}
       
       ◼︎ 모집 마감
       - ${getHangleDate(data.date)} (내일) ${data.deadline}
       
       —-
       
       ** 마감 까지 미정, 미응답인 경우 불참으로 처리 됩니다.
       ** 마감 후에도 참석 여부를 변경할 수 있습니다.`;

    return { code: 'M003', content };
  }

  M004(data: M004dto) {
    const content = `${data.name.slice(
      1,
    )}님, 다음 풋살 경기 인원모집이 곧 마감됩니다 ⌛️
       팀원들이 ${data.name.slice(
         1,
       )}님의 답을 기다리고 있어요. 이제 참석 여부를 확정 해 주세요!
       
       ◼︎ 팀 이름
       - ${data.team}
       
       ◼︎ 경기 일자
       - ${getHangleDate(data.date)}
       
       ◼︎ 경기 시간
       - ${data.startTime} - ${data.endTime}
       
       ◼︎ 경기 장소
       - ${data.station}
       
       ◼︎ 모집 마감
       - ${getHangleDate(data.date)} (오늘) ${data.deadline}
       
       —-
       
       ** 마감 까지 미정, 미응답인 경우 불참으로 처리 됩니다.
       ** 마감 후에도 참석 여부를 변경할 수 있습니다.`;

    return { code: 'M004', content };
  }

  M005(data: M005dto) {
    const content = `다음 경기의 인원모집이 마감되었습니다 🤗

       ◼︎ 팀 이름
       - ${data.team}
       
       ◼ 경기 정보
       - 일자 : ${getHangleDate(data.date)}
       - 시간 : ${data.startTime} - ${data.endTime}
       - 주소 : ${data.station}
       
       ◼︎ 모집 결과
       - 참석 : ${data.attend}명
       - 불참 : ${data.absent}명
       - 미정 : ${data.hold}명
       - 미응답 : ${data.nonRes}명
       
       —-
       
       ** 인원이 충분하다면 [경기 확정]을 해 주세요.
       ** 인원이 조금 부족하다면 [용병 초대]를 해 보세요!`;

    return { code: 'M005', content };
  }

  M006(data: M006dto) {
    const content = `[${data.name}] 선수님, [${
      data.team
    }]의 다음 경기가 확정되었어요🎉🎉

       ◼︎ 팀 이름
       - ${data.team}
       
       ◼ 경기 정보
       - 일자 : ${getHangleDate(data.date)}
       - 시간 : ${data.startTime} - ${data.endTime}
       - 주소 : ${data.station}
       
       ◼︎ 모집 결과
       - 참석 : ${data.attend}명
       - 불참 : ${data.absent}명`;

    return { code: 'M006', content };
  }

  M007(data: M007dto) {
    const content = `[${data.leader}] 주장님, 오늘 19:00에 [${
      data.team
    }]의 다음 경기가 자동 '경기 확정' 될 예정입니다.
       오늘 19:00에 팀원 모두에게 경기 확정 알림이 가게 되니, 만약 경기를 취소해야 한다면 지금 꼭 취소 해 주세요!
       
       ◼︎ 팀 이름
       - ${data.team}
       
       ◼ 경기 정보
       - 일자 : ${getHangleDate(data.date)}
       - 시간 : ${data.startTime} - ${data.endTime}
       - 주소 : ${data.station}
       
       ◼︎ 모집 결과
       - 참석 : ${data.attend}
       - 불참 : ${data.absent}`;
    return { code: 'M007', content };
  }

  M008(data: M008dto) {
    const content = `아래 팀원이 경기 참석 의사를 변경했어요.

       ◼︎ 팀원 이름
       - ${data.name}
       
       ◼︎ 참석 의사
       - ${data.before} → ${data.after}
       
       ◼︎ 팀 이름
       - ${data.team}
       
       ◼ 경기 정보
       - 일자 : ${getHangleDate(data.date)}
       - 시간 : ${data.startTime} - ${data.endTime}
       - 주소 : ${data.station}
       
       —-
       
       ** 경기 인원이 모자라면 [용병 구인]을 신청 해 보세요`;
    return { code: 'M008', content };
  }

  M009(data: M009dto) {
    const content = `[${data.name}]님, 아쉽게도 다음 경기가 취소 되었어요 😭

     ◼ 팀 이름
     - ${data.team}
     
     ◼ 경기 정보
     - 일자 : ${getHangleDate(data.date)}
     - 시간 : ${data.startTime} - ${data.endTime}
     - 주소 : ${data.station}
     
     ◼︎ 취소 사유
     - ${data.reason}`;

    return { code: 'M009dto', content };
  }

  M010(data: M010dto) {
    const content = `용병 구인 대행 신청이 완료 되었습니다. 1시간 뒤에 모집 결과를 알려드릴게요!

       ◼︎ 팀 이름
       - ${data.team}
       
       ◼ 경기 정보
       - 일자 : ${getHangleDate(data.date)}
       - 시간 : ${data.startTime} - ${data.endTime}
       - 주소 : ${data.station}
       
       ◼︎ 구인 인원
       - ${data.need}명
       
       ◼︎ 참가비
       - ${data.money}원
       
       —-
       
       ** 용병 구인 시 추가로 요청할 부분이 있으면 카카오톡 채팅으로 알려주세요. 참고해서 구인할게요!
       ** 참가비는 선정된 용병으로부터 직접 받으셔야 합니다. (향후 자동 결제 기능을 개발할 예정입니다)`;

    return { code: 'M010', content };
  }
}
