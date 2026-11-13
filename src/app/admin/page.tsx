import Link from "next/link";
import { desc } from "drizzle-orm";
import { db, schema } from "@/db";

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const posts = await db.select().from(schema.post).orderBy(desc(schema.post.publishedAt));
  return (
    <div>
      {saved && <p className="mb-4 rounded-xl bg-leaf-50 px-4 py-2 text-sm text-leaf-900">Saved “{saved}”.</p>}
      <div className="overflow-x-auto rounded-2xl ring-1 ring-leaf-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-leaf-50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t border-leaf-100">
                <td className="px-4 py-3 font-medium">
                  <Link href={`/admin/posts/${p.id}`} className="hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 capitalize">{p.kind}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-leaf-100 text-leaf-900" : "bg-sun-400/30"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{p.publishedAt.toISOString().slice(0, 10)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/${p.slug}`} className="text-leaf-700 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
