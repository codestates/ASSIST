export const userState = {
  id: 0,
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
    deadline: ['', ''],
  },
  findPassword: {
    phone: '',
  },
  teamMembers: [{ name: '', phone: '' }],
  mercenaryInvite: {
    needNumber: 0,
    money: '',
  },
  addOns: {
    paymentDay: 0,
    accountBank: '',
  },
  newLeader: {
    nowLeaderId: 0,
  },
};
