import { ReactNode } from 'react';

export default function FormLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex height-[350px] self-center mx-auto my-0 rounded-md p-4 bg-secondary">
      { children }
    </div>
  );
}
