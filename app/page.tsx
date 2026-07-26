"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      
      {/* NAVBAR */}
      <Navbar />

      {/* THEME TOGGLE */}
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>


      {/* HERO SECTION */}
      <Hero />

      {/* FEATURE CARDS */}
      <div className="flex flex-wrap justify-center gap-6 my-10">
        <Card
          title="Crop Management"
          description="Learn modern farming techniques to improve crop production."
        />

        <Card
          title="Weather Updates"
          description="Get real-time weather information for better farming decisions."
        />

        <Card
          title="Market Insights"
          description="Check latest market trends and prices."
        />
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}