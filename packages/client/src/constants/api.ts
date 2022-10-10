export default {
  login: '/auth/login',
  logout: '/auth/logout',
  books: {
    all: '/book',
    loanable: '/book/loanable',
    latest: '/book/latest',
  },
  user: {
    register: '/user',
    profile: '/user/profile',
    loans: '/loans/forCurrentUser',
  },
  loans: {
    create: '/loans',
  },
  authors: {
    list: '/author',
  },
};
