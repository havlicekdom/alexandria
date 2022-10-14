import React, { useEffect } from 'react';
import Panel from 'components/common/Panel';
import { getAuthorsList, selectAuthorsList } from 'store/authors/authorsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import List from 'components/common/List';
import Author from './Author';

function AuthorsList() {
  const dispatch = useAppDispatch();
  const authors = useAppSelector(selectAuthorsList);

  useEffect(() => {
    dispatch(getAuthorsList(null));
  }, []);

  const renderAuthors = () => authors.map((author) => (<Author author={author} key={author.id} />));

  return (
    <Panel portion={2}>
      <List>
        { renderAuthors() }
      </List>
    </Panel>
  );
}

export default AuthorsList;
