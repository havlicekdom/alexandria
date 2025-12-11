import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export default function TopBar({ children }: Props) {
  return (
    <div className="mb-8 px-4 py-8 flex items-center">
      { children }
    </div>
  );
}
