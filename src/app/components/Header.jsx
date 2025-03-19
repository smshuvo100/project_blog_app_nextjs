"use client";

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
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Project</a>
                </li>
              </ul>
            </div>

            <div className="menu-btn">
              <button className="mode" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme === "light" ? <IoIosMoon /> : <IoIosSunny />}
              </button>
              <div className="sm-btn">
                <a href="/">Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
