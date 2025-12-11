import ForgottenPasswordForm from "./ForgottenPasswordForm";
import { Metadata } from "next";
import documentTitle from "utils/documentTitle";

export const metadata: Metadata = {
  title: documentTitle("Forgotten Password"),
};

export default function ForgottenPasswordPage() {
  return <ForgottenPasswordForm />;
}
