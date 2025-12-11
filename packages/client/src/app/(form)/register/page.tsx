import RegisterForm from "./RegisterForm";
import documentTitle from "utils/documentTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: documentTitle("Register"),
};

export default function RegisterPage() {
  return <RegisterForm />;
}
