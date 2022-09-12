import * as moment from 'moment-mini';
import { defaultDateFormat } from '../constants';

export const createLoanEndDate = () => {
  const date = moment().add(process.env.LOAN_LENGHT_DAYS, 'days');

  return date.format(defaultDateFormat);
};
