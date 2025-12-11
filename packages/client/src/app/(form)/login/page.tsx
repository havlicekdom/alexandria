import documentTitle from "utils/documentTitle";
import { Metadata } from "next";
import { LoginForm } from "app/(form)/login/LoginForm";

export const metadata: Metadata = {
  title: documentTitle("Login"),
};

export default function LoginPage() {
  return <LoginForm />;
}
