"use client";

import { useActionState, useState } from "react";
import type { Category, Post } from "@/db/schema";
import { savePost, type FormState } from "./actions";

export function PostForm({ post, categories, selected }: { post?: Post; categories: Category[]; selected: number[] }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePost.bind(null, post?.id ?? null), undefined);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);
  const input = "mt-1 w-full rounded-xl border border-leaf-200 px-3 py-2 outline-none focus:ring-2 focus:ring-leaf-400";

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Title</span>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched)
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
            }}
            className={input}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">URL slug</span>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className={input}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Excerpt</span>
          <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Content (Markdown)</span>
          <textarea name="content" rows={24} defaultValue={post?.content} className={`${input} font-mono text-sm`} />
        </label>
      </div>
      <aside className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Status</span>
          <select name="status" defaultValue={post?.status ?? "draft"} className={input}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium">Type</span>
          <select name="kind" defaultValue={post?.kind ?? "recipe"} className={input}>
            <option value="recipe">Recipe</option>
            <option value="article">Article</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-sm font-medium">Prep (min)</span>
            <input name="prepMinutes" type="number" min={0} defaultValue={post?.prepMinutes ?? ""} className={input} />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Cook (min)</span>
            <input name="cookMinutes" type="number" min={0} defaultValue={post?.cookMinutes ?? ""} className={input} />
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium">Serves</span>
          <input name="servings" defaultValue={post?.servings ?? ""} className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Image path</span>
          <input name="image" defaultValue={post?.image ?? ""} placeholder="/images/2022/05/…" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Image alt text</span>
          <input name="imageAlt" defaultValue={post?.imageAlt ?? ""} className={input} />
        </label>
        <fieldset>
          <legend className="text-sm font-medium">Categories</legend>
          <div className="mt-1 max-h-72 space-y-1 overflow-y-auto rounded-xl border border-leaf-200 p-3 text-sm">
            {categories.map((c) => (
              <label key={c.id} className="flex items-center gap-2" style={{ paddingLeft: (c.path.split("/").length - 1) * 12 }}>
                <input type="checkbox" name="categories" value={c.id} defaultChecked={selected.includes(c.id)} />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>
        {state?.error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
        <button disabled={pending} className="w-full rounded-full bg-leaf-900 py-3 font-semibold text-white disabled:opacity-60">
          {pending ? "Saving…" : "Save post"}
        </button>
      </aside>
    </form>
  );
}
