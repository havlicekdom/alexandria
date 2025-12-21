import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function FormError({ children }: Props) {
  return <div className="bg-error text-text p-4 rounded-md mt-4">{children}</div>;
}
