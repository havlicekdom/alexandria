import LoginForm from "components/login/LoginForm";
import documentTitle from "utils/documentTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: documentTitle("Login"),
};

export default function LoginPage() {
  return <LoginForm />;
}
