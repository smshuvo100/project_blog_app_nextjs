"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { useEffect, useState } from "react";

import { IoIosMoon, IoIosSearch, IoIosSunny } from "react-icons/io";
export default function Header() {
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
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="flax-box">
            <div className="brand">
              <h2>
                <span>SSweb.online</span> Blog
              </h2>
            </div>

            <div className="search-box">
              <div className="input-group">
                <input type="text" placeholder="Search..." />
                <button>
                  <IoIosSearch />
                </button>
              </div>
            </div>

            <div className="menu">
              <ul>
                <li>
                  <Link href="#">Home</Link>
                </li>
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Project</Link>
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
