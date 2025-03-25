"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { IoIosMoon, IoIosSearch, IoIosSunny } from "react-icons/io";
export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  // for dark mode and light mode
  const [theme, setTheme] = useState("light");
  // for dark mode and light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);
  // for dark mode and light mode
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="flax-box">
            <Link href="/" className="brand">
              <h2>
                <span>SSweb.online</span> Blog
              </h2>
            </Link>

            <div className="search-box">
              <form className="input-group" onSubmit={handleSubmit}>
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button>
                  <IoIosSearch />
                </button>
              </form>
            </div>

            <div className="menu">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/projects">Project</Link>
                </li>
              </ul>
            </div>

            <div className="menu-btn">
              <button className="mode" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme === "light" ? <IoIosMoon /> : <IoIosSunny />}
              </button>

              <SignedIn>
                <UserButton
                  appearance={{
                    baseTheme: theme === "light" ? undefined : dark
                  }}
                />
              </SignedIn>
              <SignedOut>
                <div className="sm-btn">
                  <Link href="/sign-in">Sign In</Link>
                </div>
                {/* <div className="sm-btn">
                  <Link href="/sign-up">Sign Up</Link>
                </div> */}
              </SignedOut>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
