import Link from "next/link";
import CallToAction from "./components/CallToAction";
import RecentPosts from "./components/RecentPosts";

export default function Home() {
  return (
    <>
      <div className=" hero-home">
        <div className="container">
          <h1 className="title">Welcome to my Blog</h1>
          <p className="desc">
            Discover a variety of articles and tutorials on topics such as web development, software engineering, and programming languages, all brought to you through a blog built with Next.js and{" "}
            <a href="https://go.clerk.com/fgJHKlt" className="btn-clerk" target="_blank">
              Clerk
            </a>
            .
          </p>
          <Link href="/search" className="view-all-btn">
            View all posts
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="call-to-action">
          <CallToAction />
        </div>
      </div>
      <div className="container rece">
        <RecentPosts limit={9} />
        <div className="view-all-aa">
          <Link href={"/search?category=null"} className="view-all-home">
            View all posts
          </Link>
        </div>
      </div>
    </>
  );
}
