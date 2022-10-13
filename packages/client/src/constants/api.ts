export default {
  login: '/auth/login',
  logout: '/auth/logout',
  books: {
    all: '/book',
    loanable: '/book/loanable',
    latest: '/book/latest',
    detail: (bookId: string) => `/book/${bookId}`,
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
    detail: (authorId: string) => `/author/${authorId}`,
  },
};
