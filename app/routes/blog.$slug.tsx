import { useLoaderData } from "react-router";
import { type MetaFunction, type LoaderFunctionArgs } from "react-router";
import { MainLayout } from "~/components/layout/main-layout";
import { getPostData, type Post } from "~/lib/blog";
import { PostContent } from "~/components/blog/post-content";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Post Not Found" },
      { name: "description", content: "The requested blog post could not be found" }
    ];
  }
  
  return [
    { title: `${data.post.title} - Orestis Ioannou` },
    { name: "description", content: data.post.description || `${data.post.title} by Orestis Ioannou` },
    { property: "og:title", content: data.post.title },
    { property: "og:description", content: data.post.description || `${data.post.title} by Orestis Ioannou` },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@oorestisime" },
    { name: "twitter:title", content: data.post.title },
    { name: "twitter:description", content: data.post.description || `${data.post.title} by Orestis Ioannou` }
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  
  if (!slug) {
    throw new Response("Post not found", { status: 404 });
  }
  
  try {
    // Log the slug to help debug
    console.log("Loading post with slug:", slug);
    const post = await getPostData(slug);
    return { post };
  } catch (error) {
    console.error("Error loading post:", error);
    throw new Response("Post not found", { status: 404 });
  }
}

export default function BlogPost() {
  const { post } = useLoaderData<{ post: Post }>();
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <PostContent
          title={post.title}
          date={post.date}
          content={post.content}
          tags={post.tags}
        />
      </div>
    </MainLayout>
  );
}