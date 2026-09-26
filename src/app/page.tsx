"use client";

import { useState } from "react";
import HomePage from "../pages/HomePage";
import Loading from "./loading"; // Update path if stored elsewhere

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <Loading 
        duration={2000} // Adjust time in ms (e.g., 2000 = 2 seconds)
        onComplete={() => setIsLoading(false)} 
      />
    );
  }

  return <HomePage />;
}