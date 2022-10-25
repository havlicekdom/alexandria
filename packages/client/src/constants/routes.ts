export default {
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  overview: '/',
  authors: '/authors',
  authorsDetail: (authorId: string) => `/authors/${authorId}`,
  books: '/books',
  booksDetail: (bookId: string) => `/books/${bookId}`,
  genres: '/genres',
  genresDetail: (genreId: string) => `/genres/${genreId}`,
  settings: '/settings',
};
