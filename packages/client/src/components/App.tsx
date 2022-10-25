import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'store/hooks';
import { getUserProfile } from 'store/user/userSlice';
import { selectIsLoading, selectMessage } from 'store/shared/sharedSlice';

import ProtectedRoute from './shell/ProtectedRoute';
import Spinner from './shell/Spinner';
import Snackbar from './common/Snackbar';
import FormPage from './common/FormPage';

import Login from './login';
import Register from './register';
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
  const isLoading = useSelector(selectIsLoading);
  const message = useSelector(selectMessage);

  useEffect(() => {
    dispatch(getUserProfile(null))
      .then(() => {
        navigate('/', { replace: true });
      });
  }, []);

  return (
    <S.App>
      {isLoading && <Spinner />}
      {message && (
        <Snackbar variant={message.type}>
          { message.text }
        </Snackbar>
      )}
      <Routes>
        <Route element={<FormPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Overview />} />
          <Route path="/authors">
            <Route index element={<Authors />} />
            <Route path=":authorId" element={<AuthorsDetailPage />} />
          </Route>
          <Route path="/books">
            <Route index element={<Books />} />
            <Route path=":bookId" element={<BooksDetailPage />} />
          </Route>
          <Route path="/genres">
            <Route index element={<Genres />} />
            <Route path=":genreId" element={<GenresDetailPage />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </S.App>
  );
}

export default App;
