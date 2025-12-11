'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isActive = usePathname() === href;
  const defaultClass = 'block text-text no-underline p-4 pl-8 rounded-tr-[10px] rounded-br-[10px] transition-colors duration-100 hover:bg-primary! hover:text-backgroundColor';

  return <Link href={href} className={`${defaultClass} ${isActive ? 'bg-primary! text-backgroundColor' : ''}`}>{children}</Link>;
}
