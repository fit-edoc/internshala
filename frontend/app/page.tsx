"use client"

import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { useFilteredInternships } from "@/hooks/useFilteredInternships";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import InternshipList from "@/components/InternshipList";

export default function Home() {
  const { internships, isLoading, filters, setFilters } = useData();
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
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col font-sans antialiased text-gray-800">
      {/* Premium Header Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-2xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Visual Logo Replicating Internshala's Primary brand Identity */}
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="font-extrabold text-xl md:text-2xl text-gray-800 tracking-tight">
                intern<span className="text-sky-500 transition-colors group-hover:text-sky-600">shala</span>
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:scale-125 transition-transform mt-3"></div>
              <img src="/logo.png"  className="h-6 w-6" alt="" />
            </div>
          </div>

          {/* Dummy Navigation links for aesthetic premium feel */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
            <span className="text-sky-500 cursor-pointer border-b-2 border-sky-500 pb-1 font-bold">
              Internships
            </span>
            <span className="hover:text-gray-800 cursor-pointer transition-colors">Jobs</span>
            <span className="hover:text-gray-800 cursor-pointer transition-colors">Courses</span>
            <div className="w-px h-4 bg-gray-200"></div>
            <button className="bg-sky-50 text-sky-600 font-semibold px-4 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-100 transition-all text-xs">
              Post Internship
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col gap-6">
        
        {/* Title & Hero Section */}
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left mt-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
            Search Internships
          </h1>
          <p className="text-xs md:text-sm text-gray-500 font-medium max-w-xl">
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
