"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized"
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl
      });
    }
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch("/api/post/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          limit: 9,
          order: sortFromUrl || "desc",
          category: categoryFromUrl || "uncategorized",
          searchTerm: searchTermFromUrl
        })
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [searchParams]);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sidebarData.searchTerm) {
      sidebarData.searchTerm = "";
    }
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };
  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch("/api/post/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        limit: 9,
        order: sidebarData.sort,
        category: sidebarData.category,
        searchTerm: sidebarData.searchTerm,
        startIndex
      })
    });
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  return (
    <div className="container">
      <div className="search-container">
        <div className="search-sidebar">
          <div className="filters">
            <form className="form" onSubmit={handleSubmit}>
              <div className="search-term">
                <label className="title">Search Term:</label>
                <input placeholder="Search..." id="searchTerm" type="text" value={sidebarData.searchTerm} onChange={handleChange} />
              </div>
              <div className="short-by">
                <label className="title">Sort:</label>
                <select onChange={handleChange} id="sort">
                  <option value="desc">Latest</option>
                  <option value="asc">Oldest</option>
                </select>
              </div>
              <div className="category">
                <label className="title">Category:</label>
                <select onChange={handleChange} id="category">
                  <option value="uncategorized">Uncategorized</option>
                  <option value="reactjs">React.js</option>
                  <option value="nextjs">Next.js</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>
              <button type="submit" className="apply-filters">
                Apply Filters
              </button>
            </form>
          </div>
        </div>
        <div className="search-results">
          <h1 className="title">Posts results:</h1>
          <div className="search-results-container">
            {!loading && posts.length === 0 && <p className="not-found">No posts found.</p>}
            {loading && <p className="loading">Loading...</p>}
            {!loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
            {showMore && (
              <button onClick={handleShowMore} className="show-more-btn">
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
