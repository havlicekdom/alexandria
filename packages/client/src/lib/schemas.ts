import yup from "utils/formValidation";
import { formValidation as translations } from "translations";

export const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export const forgottenPasswordSchema = yup
  .object({
    email: yup.string().email().required().max(255),
  })
  .required();

export const registerSchema = yup
  .object({
    username: yup.string().required().max(255),
    email: yup.string().email().required().max(255),
    password: yup.string().required().max(255),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], translations.passwordsDontMatch)
      .max(255),
  })
  .required();

export const resetPasswordSchema = yup
  .object({
    id: yup.string().required(),
    password: yup.string().required().max(255),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], translations.passwordsDontMatch)
      .max(255),
  })
  .required();

export const settingsSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required().max(255),
    password: yup.string().required().max(255),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], translations.passwordsDontMatch)
      .max(255),
  })
  .required();

export const loanModalSchema = yup
  .object({
    userId: yup.string().required(),
    bookId: yup.string().required(),
  })
  .required();
