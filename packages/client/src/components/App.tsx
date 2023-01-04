import React, { useContext, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'store/hooks';
import { getUserProfile } from 'store/user/userSlice';
import { selectIsLoading, selectMessage } from 'store/shared/sharedSlice';

import routes, { publicRoutes } from 'constants/routes';
import { ThemeContext } from 'context/ThemeContext';

import ProtectedRoute from './shell/ProtectedRoute';
import Spinner from './shell/Spinner';
import Snackbar from './common/Snackbar';
import FormPage from './common/FormPage';

import Login from './login';
import Register from './register';
import ForgottenPassword from './forgotten-password';
import ResetPassword from './reset-password';
import Overview from './overview';
import Authors from './authors';
import AuthorsDetailPage from './authors/DetailPage';
import Books from './books';
import BooksDetailPage from './books/DetailPage';
import Genres from './genres';
import GenresDetailPage from './genres/DetailPage';
import Settings from './settings';
import NotFound from './not-found';

import * as S from './App.styled';

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoading = useSelector(selectIsLoading);
  const message = useSelector(selectMessage);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (publicRoutes.some((route) => pathname.includes(route))) return;

    dispatch(getUserProfile(null))
      .then(() => {
        navigate('/', { replace: true });
      });
  }, []);

  return (
    <>
      <S.GlobalStyles currentTheme={theme} />
      <S.App currentTheme={theme}>
        {isLoading && <Spinner />}
        {message && (
          <Snackbar variant={message.type}>
            { message.text }
          </Snackbar>
        )}
        <Routes>
          <Route element={<FormPage />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.forgottenPassword} element={<ForgottenPassword />} />
            <Route path={routes.resetPassword} element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path={routes.overview} element={<Overview />} />
            <Route path={routes.authors}>
              <Route index element={<Authors />} />
              <Route path=":authorId" element={<AuthorsDetailPage />} />
            </Route>
            <Route path={routes.books}>
              <Route index element={<Books />} />
              <Route path=":bookId" element={<BooksDetailPage />} />
            </Route>
            <Route path={routes.genres}>
              <Route index element={<Genres />} />
              <Route path=":genreId" element={<GenresDetailPage />} />
            </Route>
            <Route path={routes.settings} element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </S.App>
    </>
  );
}

export default App;
