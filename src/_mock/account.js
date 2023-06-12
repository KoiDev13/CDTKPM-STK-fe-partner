import accountSetting from '../services/header.service'

const account = {
  displayName:   accountSetting.userName(),
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_12.jpg',
};

export default account;
