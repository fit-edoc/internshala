import React, { useMemo } from "react";
import { Filters, Internship } from "@/context/DataContext";
import InternshipCard from "./InternshipCard";

interface InternshipListProps {
  internships: Internship[];
  isLoading: boolean;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onOpenMobileFilters: () => void;
}

export default function InternshipList({
  internships,
  isLoading,
  filters,
  setFilters,
  onOpenMobileFilters,
}: InternshipListProps) {
  // Count active filters (excluding global search and sortBy)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.profile !== "") count++;
    if (filters.location !== "") count++;
    if (filters.duration !== "") count++;
    if (filters.minStipend > 0) count++;
    return count;
  }, [filters]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      profile: "",
      location: "",
      duration: "",
      minStipend: 0,
      search: "",
      sortBy: "newest",
    });
  };

  // Skeleton Loader for premium loading experience
  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 w-full">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center py-2 animate-pulse">
          <div className="h-6 w-40 bg-gray-200 dark:bg-slate-800 rounded-md"></div>
          <div className="h-8 w-32 bg-gray-200 dark:bg-slate-800 rounded-md"></div>
        </div>

        {/* List of Skeleton Cards */}
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="bg-card border border-border rounded-lg p-5 md:p-6 shadow-xs animate-pulse flex flex-col gap-4"
          >
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-md bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="flex flex-col gap-2 w-1/2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/2"></div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 py-2 border-y border-border my-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md w-1/2"></div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24"></div>
              <div className="flex gap-3">
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-16"></div>
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Beautiful Empty State
  if (internships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-card border border-border rounded-lg p-8 md:p-12 text-center shadow-xs w-full max-w-xl mx-auto my-6 animate-fade-in">
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 mb-6 shadow-inner">
          <svg
            className="w-8 h-8 stroke-current"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14h.01M10 10h.01"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-foreground tracking-tight text-base md:text-lg mb-2">
          No Internships Found
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
          We couldn't find any internships matching your current search term or filter selection. Try loosening your criteria!
        </p>
        <button
          onClick={handleResetFilters}
          type="button"
          className="bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 text-zinc-50 dark:text-zinc-900 font-semibold text-sm px-6 py-2.5 rounded-md transition-all shadow-xs"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header Info Panel (Filter count, item count, and Sort select) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card text-card-foreground p-4 border border-border shadow-xs rounded-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-foreground font-semibold text-sm">
            {internships.length} internship{internships.length > 1 ? "s" : ""} found
          </span>
          {activeFiltersCount > 0 && (
            <span className="bg-linear-to-bl from-sky-500 to-sky-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 font-semibold text-xs px-2 py-0.5 rounded-md border border-border flex items-center gap-1 shadow-2xs">
              {activeFiltersCount} active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            type="button"
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-xs font-medium text-foreground bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus:outline-none shadow-2xs"
          >
            <svg
              className="w-4 h-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.814c0-.54.384-1.006.917-1.096A50.065 50.065 0 0112 3z"
              />
            </svg>
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Selection */}
          <div className="flex items-center gap-2">
            <label htmlFor="sortBy" className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider hidden xs:block">
              Sort by
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={handleSortChange}
              className="text-xs md:text-sm font-semibold text-foreground bg-card border border-input rounded-md px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-2xs"
            >
              <option value="newest">Newest First</option>
              <option value="highest_stipend">Highest Stipend</option>
              <option value="shortest_duration">Shortest Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* Render Internship Cards */}
      <div className="flex flex-col gap-4 md:gap-5 w-full">
        {internships.map((item) => (
          <InternshipCard key={item.id} internship={item} />
        ))}
      </div>
    </div>
  );
}
