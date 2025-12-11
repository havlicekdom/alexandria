import ResetPasswordForm from "./ResetPasswordForm";

import { Metadata } from "next";
import documentTitle from "utils/documentTitle";

export const metadata: Metadata = {
  title: documentTitle("Reset your password"),
};

export default function ResetPassword() {
  return <ResetPasswordForm />;
}
