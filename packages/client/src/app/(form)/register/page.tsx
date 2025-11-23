"use client";

import { useContext } from "react";
import SuccessMessage from "components/common/SuccessMessage";
import { SubmitSuccessfulContext } from "context/SubmitSuccessfulContext";
import RegisterForm from "components/register/RegisterForm";
import documentTitle from "utils/documentTitle";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: documentTitle("Register"),
// };

export default function RegisterPage() {
  const { isSuccessfullySubmitted } = useContext(SubmitSuccessfulContext);

  return isSuccessfullySubmitted ? (
    <SuccessMessage>
      Registration completed. Please check your inbox for verification email.
    </SuccessMessage>
  ) : (
    <RegisterForm />
  );
}
