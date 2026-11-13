import { getAllCategories } from "@/lib/content";
import { PostForm } from "../../post-form";

export default async function NewPost() {
  return <PostForm categories={await getAllCategories()} selected={[]} />;
}
