"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useEffect, useState } from "react";

export default function Page() {
  const [isDarkMode, setIsDarkMode] = useState(null); // Start as null to prevent flicker

  useEffect(() => {
    // Function to check and update the theme
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setIsDarkMode(currentTheme === "dark");
    };

    // Initial check
    updateTheme();

    // MutationObserver to watch for theme changes in <html>
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  if (isDarkMode === null) return null; // Prevent rendering before detecting theme

  return (
    <div className="container">
      <div className="box-center">
        <SignIn
          appearance={{
            baseTheme: isDarkMode ? dark : undefined // Uses default light theme if false
          }}
        />
      </div>
    </div>
  );
}
