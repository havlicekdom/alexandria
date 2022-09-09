import * as yup from 'yup';

import { formValidation as translations } from 'translations';

yup.setLocale({
  mixed: {
    required: translations.fieldRequired,
  },
  string: {
    email: translations.invalidEmail,
  },
});

export default yup;
