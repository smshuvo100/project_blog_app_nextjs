import Link from "next/link";
export default function PostCard({ post }) {
  return (
    <div className="card">
      <Link href={`/post/${post.slug}`}>
        <img src={post.image} alt="post cover" className="img" />
      </Link>
      <div className="card-info">
        <span className="r-cat">{post.category}</span>
        <p className="r-title">{post.title}</p>

        <div className="btn">
          <Link href={`/post/${post.slug}`} className="link">
            Read article
          </Link>
        </div>
      </div>
    </div>
  );
}
