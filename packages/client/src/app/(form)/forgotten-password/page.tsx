"use client";

import { useContext } from "react";
import SuccessMessage from "components/common/SuccessMessage";
import { SubmitSuccessfulContext } from "context/SubmitSuccessfulContext";
import ForgottenPasswordForm from "components/forgotten-password/ForgottenPasswordForm";
import { Metadata } from "next";
import documentTitle from "utils/documentTitle";

// export const metadata: Metadata = {
//   title: documentTitle("Forgotten Password"),
// };

export default function ForgottenPasswordPage() {
  const { isSuccessfullySubmitted } = useContext(SubmitSuccessfulContext);

  return isSuccessfullySubmitted ? (
    <SuccessMessage>
      Password reset process started! Please check your inbox for email with
      steps how to proceed.
    </SuccessMessage>
  ) : (
    <ForgottenPasswordForm />
  );
}
