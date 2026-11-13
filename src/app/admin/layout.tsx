import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export const metadata = { robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await requireAdmin())) redirect("/sign-in");
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/admin" className="text-2xl font-bold text-leaf-900">
          Admin
        </Link>
        <Link href="/admin/posts/new" className="rounded-full bg-leaf-900 px-5 py-2 text-sm font-semibold text-white">
          New post
        </Link>
      </div>
      {children}
    </div>
  );
}
