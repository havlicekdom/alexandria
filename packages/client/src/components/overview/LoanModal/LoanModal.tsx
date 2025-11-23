/* eslint-disable react/jsx-props-no-spreading */


import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncSelect from 'react-select/async';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { errorColor } from 'constants/styles';
import Modal from 'components/common/Modal';
import yup from 'utils/formValidation';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectUser } from 'store/user/userSlice';
import Icon from 'components/common/Icon';
import { fetchLoanableBooks } from 'store/books/booksAPI';
import { Book } from 'types/book';
import { createNewLoan } from 'store/loans/loansSlice';

import * as S from './LoanModal.styled';

type Props = {
  close: () => void;
}

type FormInputs = {
  userId: string;
  bookId: string;
}

const validationSchema = yup.object({
  userId: yup.string().required(),
  bookId: yup.string().required(),
}).required();

function LoanModal({ close }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const filterBooks = (books: Book[], inputValue: string) => books.filter(
    (book) => book.name.toLowerCase().includes(inputValue.toLowerCase()),
  ).map((book) => ({
    value: book.id,
    label: book.name,
  }));

  const loadOptions = async (inputValue: string) => {
    const response = await fetchLoanableBooks();
    return filterBooks(response.data, inputValue);
  };

  const handleSelectChange = (selectedBook: any) => {
    setValue('bookId', selectedBook.value);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    await dispatch(createNewLoan(formData));
    close();
  };

  return (
    <Modal close={close} size="small">
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <input data-testid="loan-modal-userId" type="hidden" value={user.id} {...register('userId')} />
        <input data-testid="loan-modal-bookId" type="hidden" {...register('bookId')} />
        <S.Legend>Select a book:</S.Legend>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange={handleSelectChange}
          placeholder="Start typing to search for books"
          styles={
            errors.bookId
              ? { control: (base) => ({ ...base, borderColor: errorColor }) }
              : undefined
          }
        />
        { errors.bookId && (
          <S.Error>
            You need to select a book first.
          </S.Error>
        )}
        <S.SubmitButton data-testid="loan-modal-submit" variant="primary" type="submit" name="submit" $full>
          <Icon icon={faPlusCircle} />
          Loan
        </S.SubmitButton>
      </S.Form>
    </Modal>
  );
}

export default LoanModal;
