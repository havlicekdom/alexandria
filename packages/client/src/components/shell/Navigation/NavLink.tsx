import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const isActive = usePathname() === to;

  return <Link href={to} className={isActive ? "active" : ""}>{children}</Link>;
}
