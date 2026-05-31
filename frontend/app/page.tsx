"use client"

import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { useTheme } from "@/context/ThemeContext";
import { useFilteredInternships } from "@/hooks/useFilteredInternships";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import InternshipList from "@/components/InternshipList";

export default function Home() {
  const { internships, isLoading, filters, setFilters } = useData();
  const { theme, toggleTheme } = useTheme();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Apply custom filtering and sorting hook
  const filteredInternships = useFilteredInternships(internships, filters);

  const handleSearchChange = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      search: val,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased transition-colors duration-200">
      {/* Premium Header Navbar */}
      <header className="sticky top-0 z-30 bg-card/95 border-b border-border shadow-2xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Visual Logo Replicating Internshala's Primary brand Identity */}
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="font-bold text-lg md:text-xl text-foreground tracking-tight">
                intern<span className="text-sky-500">shala</span>
              </span>
              <div className="w-1 h-1 rounded-full bg-sky-500 mt-2.5"></div>
              <img src="/logo.png"  className="h-5 w-5" alt="" />
            </div>
          </div>

          {/* Navigation links & Theme Toggle */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <span className="text-sky-500 dark:text-sky-400 cursor-pointer font-semibold">
                Internships
              </span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Jobs</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Courses</span>
              <div className="w-px h-3 bg-border"></div>
              <button className="bg-sky-500 dark:bg-sky-50 hover:bg-sky-900/90 dark:hover:bg-zinc-50/90 text-zinc-50 dark:text-zinc-900 font-medium px-4 py-1.5 rounded-md transition-all text-xs shadow-xs cursor-pointer">
                Post Internship
              </button>
            </nav>

            {/* Premium Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-transparent border border-border text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shadow-xs cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? (
                // Moon Icon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                // Sun Icon
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728A9 9 0 115.636 5.636a9 9 0 0112.728 12.728z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col gap-6">
        
        {/* Title & Hero Section */}
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left mt-2">
          <h1 className="text-lg md:text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
            Search Internships
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-normal max-w-xl">
            Find and apply to the best internships across technology, design, business analytics, and marketing.
          </p>
        </div>

        {/* Global Search Bar Section */}
        <section className="w-full max-w-3xl mx-auto md:mx-0">
          <SearchBar value={filters.search} onChange={handleSearchChange} />
        </section>

        {/* Two-Column Responsive Layout */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-start">
          {/* Left Column: Filter Sidebar (25% width on desktop) */}
          <div className="md:col-span-1">
            <FilterSidebar
              internships={internships}
              filters={filters}
              setFilters={setFilters}
              isOpen={isMobileFiltersOpen}
              onClose={() => setIsMobileFiltersOpen(false)}
            />
          </div>

          {/* Right Column: Internship Listings (75% width on desktop) */}
          <div className="md:col-span-3">
            <InternshipList
              internships={filteredInternships}
              isLoading={isLoading}
              filters={filters}
              setFilters={setFilters}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
