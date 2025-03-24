import PostCard from "./PostCard";
export default async function RecentPosts({ limit }) {
  let posts = null;
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: limit, order: "desc" }),
      cache: "no-store"
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }
  return (
    <div className="recent-posts">
      <h1 className="title">Recent articles</h1>
      <div className="card-container">{posts && posts.map((post) => <PostCard key={post._id} post={post} />)}</div>
    </div>
  );
}
