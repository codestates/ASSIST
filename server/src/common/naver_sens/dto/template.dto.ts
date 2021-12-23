export class M001dto {
  matchId: number;
  team: string;
  startTime: string;
  endTime: string;
  address: string;
  address2: string;
  date: string;
}
export class M012dto {
  matchId: number;
  name: string;
  team: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  address2: string;
  deadline: string;
}

export class M003dto extends M012dto {}
export class M004dto extends M012dto {}

export class M005dto extends M001dto {
  attend: number;
  absent: number;
  hold: number;
  nonRes: number;
}

export class M006dto extends M001dto {
  name: string;
  attend: number;
  absent: number;
}

export class M007dto extends M006dto {
  leader: string;
}

enum voteCondition {
  attend = '참석',
  absent = '불참',
  hold = '미정',
}
export class M008dto {
  matchId: string;
  team: string;
  startTime: string;
  endTime: string;
  address: string;
  address2: string;
  date: string;
  name: string;
  leader: string;
  before: voteCondition;
  after: voteCondition;
}

export class M019dto {
  matchId: string;
  team: string;
  startTime: string;
  endTime: string;
  address: string;
  address2: string;
  date: string;
  name: string;
  reason: string;
  to: string;
}

export class M010dto {
  matchId: string;
  team: string;
  startTime: string;
  endTime: string;
  address: string;
  address2: string;
  date: string;
  need: number;
  money: number;
}

export class T001dto {
  teamId: number;
  team: string;
  leader: string;
  code: string;
  name: string;
}

export class T002dto {
  teamId: number;
  team: string;
  name?: string;
}

export class T003dto {
  teamId: number;
  team: string;
  leader: string;
}

export class T014dto {
  teamId: number;
  team: string;
  leader: string;
}

export class T005dto {
  team: string;
  name?: string;
}

export class T006dto {
  teamId: number;
  team: string;
  name: string;
}

export class T007dto {
  teamId: number;
  team: string;
  name: string;
}
export class T009dto {
  teamId: number;
  team: string;
  date: string;
  bank: string;
  accountNumber: string;
}
