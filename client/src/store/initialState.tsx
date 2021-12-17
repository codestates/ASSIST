export const userState = {
  id: '',
  token: '',
  phone: '',
  email: '',
  name: '',
  gender: '',
  role: '',
  provider: '',
  selectedTeam: { id: -1, name: '', leader: false },
};

export const propsState = {
  joinTeam: {
    name: '',
    code: '',
  },
  createTeam: {
    name: '',
    paymentDay: 0,
    accountBank: '',
    accountNumber: '',
    dues: '',
  },
  getStarted: {
    email: '',
    phone: '',
    password: '',
    name: '',
    gender: '',
  },
  scheduleManage: {
    date: '',
    startTime: '',
    endTime: '',
    address: '',
    address2: '',
    deadline: '',
  },
  findPassword: {
    phone: '',
  },
  matchId: -1,
  teamMembers: [{ name: '', phone: '' }],

  newLeader: {
    nowLeaderId: 0,
  },
};
