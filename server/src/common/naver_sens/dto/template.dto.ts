export class M001dto {
  team: string;
  startTime: string;
  endTime: string;
  address: string;
  address2: string;
  date: string;
}
export class M002dto {
  name: string;
  team: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  address2: string;
  deadline: string;
}

export class M003dto extends M002dto {}
export class M004dto extends M002dto {}

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
export class M008dto extends M001dto {
  name: string;
  before: voteCondition;
  after: voteCondition;
}

export class M009dto extends M001dto {
  name: string;
  reason: string;
}

export class M010dto extends M001dto {
  need: number;
  money: number;
}

export class T001dto {
  team: string;
  leader: string;
  code: string;
  name: string;
}

export class T002dto {
  team: string;
  name?: string;
}

export class T003dto extends T002dto {
  leader: string;
}

export class T009dto extends T002dto {
  date: string;
  bank: string;
  accountNumber: string;
}
