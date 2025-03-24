import Link from "next/link";
import CallToAction from "../../components/CallToAction";
import RecentPosts from "../../components/RecentPosts";
export default async function PostPage({ params }) {
  let post = null;
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ slug: params.slug }),
      cache: "no-store"
    });
    const data = await result.json();
    post = data.posts[0];
  } catch (error) {
    post = { title: "Failed to load post" };
  }
  if (!post || !post.title === "Failed to load post") {
    return (
      <div className="not-found">
        <h2>Post not found</h2>
      </div>
    );
  }
  return (
    <div className="single-post">
      <div className="container">
        <h1>{post && post.title}</h1>
        <Link href={`/search?category=${post && post.category}`} className="cat-btn">
          <button>{post && post.category}</button>
        </Link>
        <img src={post && post.image} alt={post && post.title} />

        <div className="post-info">
          <div className="post-meta">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span> {post && (post?.content?.length / 1000).toFixed(0)} mins read</span>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post?.content }}></div>
        </div>

        <div className="call-to-action">
          <CallToAction />
        </div>

        <RecentPosts limit={3} />
      </div>
    </div>
  );
}
