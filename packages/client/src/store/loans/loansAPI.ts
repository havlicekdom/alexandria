import axios from 'utils/api';
import API from 'constants/api';

export type CreateNewLoanData = {
  userId: string;
  bookId: string;
};

export const postNewLoan = (formData: CreateNewLoanData) => axios.post(API.loans.create, formData);
