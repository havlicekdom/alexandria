const routes = {
  login: '/login',
  register: '/register',
  forgottenPassword: '/forgotten-password',
  resetPassword: '/reset-password/:id',
  overview: '/overview',
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
  `${routes.register}/success`,
  routes.forgottenPassword,
  `${routes.forgottenPassword}/success`,
  'reset\-password\/?[a-zA-Z0-9\-]*',
];

export default routes;
