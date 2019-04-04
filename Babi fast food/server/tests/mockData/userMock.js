const correctUser = {
  name: 'Marcus',
  email: 'marcus2cu@yahoo.com',
  phone: '07065266168',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const undefinedName = {
  email: 'marcus@gmail.com',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const unstringedName = {
  name: ['macre'],
  email: 'marcus@gmail.com',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const emptyName = {
  name: '',
  email: 'marcus@gmail.com',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const invalidNameLength = {
  name: 'ma',
  email: 'marcus@gmail.com',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const invalidNameCharacter = {
  name: 'ma@andela',
  email: 'marcus@gmail.com',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const undefinedEmail = {
  name: 'marc marc',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const unstringedEmail = {
  name: 'marc marc',
  email: ['myemail@abc.com'],
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const emptyEmail = {
  name: 'marc marc',
  email: '',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const invalidEmailLength = {
  name: 'marc marc',
  email: 'a@c.gov',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const invalidEmailCharacter = {
  name: 'marc marc',
  email: 'ab##@c##d.ng',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const existingEmail = {
  name: 'Marcus',
  email: 'marcus2cu@yahoo.com',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const undefinedPhone = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const unstringedPhone = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: ['08025645896'],
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const emptyPhone = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const invalidPhoneLength = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '070652',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const invalidPhoneCharacter = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169#@',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const existingPhone = {
  name: 'Marcus',
  email: 'marcmarc@yahoo.com',
  phone: '07065266168',
  address: 'Andela EPIC Tower',
  password: 'marcpass'
};

const undefinedPassword = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
};

const unstringedPassword = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: ['mypass', 'yourpass']
};

const emptyPassword = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: ''
};

const invalidPasswordLength = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'a'
};

const whitespacePassword = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: 'Andela EPIC Tower',
  password: 'marc pass'
};

const undefinedAddress = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  password: 'marcpass'
};

const unstringedAddress = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: ['Andela EPIC Tower'],
  password: 'marcpass'
};

const emptyAddress = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: '',
  password: 'marcpass'
};

const invalidAddressLength = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: 'An',
  password: 'marcpass'
};

const invalidAddressCharacter = {
  name: 'marc marc',
  email: 'marc@gmail.ng',
  phone: '07065266169',
  address: 'A!@abcd',
  password: 'marcpass'
};

const correctLogin = {
  email: 'marcus2cu@yahoo.com',
  password: 'marcpass'
};

const undefinedEmailLogin = {
  password: 'marcpass'
};

const emptyEmailLogin = {
  email: '',
  password: 'marcpass'
};

const unstringedEmailLogin = {
  email: ['email@gmail.com'],
  password: 'marcpass'
};

const nonExistingEmail = {
  email: 'marcman@gmial.com',
  password: 'marcpass'
};

const undefinedPasswordLogin = {
  email: 'marcus2cu@yahoo.com'
};

const emptyPasswordLogin = {
  email: 'marcus2cu@yahoo.com',
  password: ''
};

const unstringedPasswordLogin = {
  email: 'marcus2cu@yahoo.com',
  password: ['mypass']
};

const correctEmailIncorrectPassword = {
  email: 'marcus2cu@yahoo.com',
  password: 'marc#@pass!'
};

export {
  correctUser, undefinedName, emptyName, invalidNameLength, invalidNameCharacter,
  undefinedEmail, emptyEmail, invalidEmailLength, invalidEmailCharacter, existingEmail,
  undefinedPhone, emptyPhone, invalidPhoneLength, invalidPhoneCharacter, existingPhone,
  undefinedPassword, emptyPassword, invalidPasswordLength, undefinedAddress, emptyAddress,
  invalidAddressLength, invalidAddressCharacter, whitespacePassword, correctLogin,
  undefinedEmailLogin, emptyEmailLogin, nonExistingEmail, undefinedPasswordLogin,
  emptyPasswordLogin, correctEmailIncorrectPassword, unstringedEmailLogin, unstringedPasswordLogin,
  unstringedName, unstringedEmail, unstringedPhone, unstringedAddress, unstringedPassword
};
