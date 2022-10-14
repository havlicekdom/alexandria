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

import {
  Authors,
  AuthorsDetailPage,
  Books,
  BooksDetailPage,
  Genres,
  Loans,
  Login,
  Overview,
  Register,
  ResetPassword,
  Settings,
} from './pages';

import * as S from './App.styled';
import ProtectedRoute from './shell/ProtectedRoute';
import Spinner from './shell/Spinner';
import Snackbar from './common/Snackbar';

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
          <Route path="/genres" element={<Genres />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </S.App>
  );
}

export default App;
