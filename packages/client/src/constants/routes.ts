const routes = {
  login: '/login',
  register: '/register',
  forgottenPassword: '/forgotten-password',
  resetPassword: '/reset-password/:id',
  overview: '/',
  authors: '/authors',
  authorsDetail: (authorId: string) => `/authors/${authorId}`,
  books: '/books',
  booksDetail: (bookId: string) => `/books/${bookId}`,
  genres: '/genres',
  genresDetail: (genreId: string) => `/genres/${genreId}`,
  settings: '/settings',
};

export const publicRoutes = [
  routes.login,
  routes.register,
  routes.forgottenPassword,
  '/reset-password', // used to check if the route is public, has to be without the parameter
];

export default routes;
