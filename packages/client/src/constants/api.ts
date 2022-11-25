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
    forgottenPassword: '/user/forgotten-password',
    resetPassword: '/user/reset-password',
    profile: '/user/profile',
    loans: '/loans/forCurrentUser',
    update: (userId: string) => `/user/${userId}`,
  },
  loans: {
    create: '/loans',
  },
  authors: {
    list: '/author',
    detail: (authorId: string) => `/author/${authorId}`,
  },
  genres: {
    list: '/genre',
    detail: (genreId: string) => `/genre/${genreId}`,
  },
};
