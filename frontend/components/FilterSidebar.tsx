import React, { useMemo } from "react";
import { Filters, Internship } from "@/context/DataContext";
import FilterSection from "./FilterSection";

interface FilterSidebarProps {
  internships: Internship[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  internships,
  filters,
  setFilters,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  // Dynamically extract unique location names from internships
  const uniqueLocations = useMemo(() => {
    const locSet = new Set<string>();
    internships.forEach((item) => {
      if (item.location_names) {
        item.location_names.forEach((name) => {
          if (name && name.trim()) {
            locSet.add(name.trim());
          }
        });
      }
    });
    return Array.from(locSet).sort();
  }, [internships]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.profile !== "" ||
      filters.location !== "" ||
      filters.duration !== "" ||
      filters.minStipend > 0
    );
  }, [filters]);

  const handleClearAll = () => {
    setFilters((prev) => ({
      ...prev,
      profile: "",
      location: "",
      duration: "",
      minStipend: 0,
    }));
  };

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const stipendPresets = [0, 5000, 10000, 15000, 20000];

  const sidebarContent = (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm flex flex-col gap-1 w-full h-full max-h-[85vh] md:max-h-none overflow-y-auto">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-2">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-gray-700"
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
          <span className="font-semibold text-gray-800 text-sm md:text-base">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors focus:outline-none"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Profile Filter */}
      <FilterSection
        label="Profile"
        showClear={filters.profile !== ""}
        onClear={() => handleFilterChange("profile", "")}
      >
        <input
          type="text"
          value={filters.profile}
          onChange={(e) => handleFilterChange("profile", e.target.value)}
          placeholder="e.g. Data Science, Web Dev"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-500 hover:border-gray-300 transition-all"
        />
      </FilterSection>

      {/* Location Filter */}
      <FilterSection
        label="Location"
        showClear={filters.location !== ""}
        onClear={() => handleFilterChange("location", "")}
      >
        <select
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-500 hover:border-gray-300 transition-all"
        >
          <option value="">Select Location</option>
          <option value="Remote">Work from Home (Remote)</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* Duration Filter */}
      <FilterSection
        label="Max Duration"
        showClear={filters.duration !== ""}
        onClear={() => handleFilterChange("duration", "")}
      >
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange("duration", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-500 hover:border-gray-300 transition-all"
        >
          <option value="">Select Max Duration</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
          <option value="4 Months">4 Months</option>
          <option value="6 Months">6 Months</option>
        </select>
      </FilterSection>

      {/* Stipend Filter */}
      <FilterSection
        label="Min Stipend (₹)"
        showClear={filters.minStipend > 0}
        onClear={() => handleFilterChange("minStipend", 0)}
      >
        <div className="flex flex-col gap-3 mt-1">
          {/* Preset stipend options as pills */}
          <div className="flex flex-wrap gap-1.5">
            {stipendPresets.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleFilterChange("minStipend", val)}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all border ${
                  filters.minStipend === val
                    ? "bg-sky-50 border-sky-300 text-sky-600 shadow-sm"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {val === 0 ? "Any" : `₹${val / 1000}k+`}
              </button>
            ))}
          </div>

          {/* Slider with read-out */}
          <div className="flex flex-col gap-1 mt-1">
            <input
              type="range"
              min="0"
              max="30000"
              step="2000"
              value={filters.minStipend}
              onChange={(e) => handleFilterChange("minStipend", parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-semibold text-gray-400 px-0.5">
              <span>₹0</span>
              <span className="text-sky-500 font-bold">
                {filters.minStipend === 0 ? "Any" : `₹${filters.minStipend.toLocaleString()}`}
              </span>
              <span>₹30k</span>
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on md and above) */}
      <aside className="hidden md:block w-full">{sidebarContent}</aside>

      {/* Mobile Drawer (visible on mobile only, custom animations) */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Drawer container (slides from left) */}
        <div
          className={`absolute inset-y-0 left-0 w-full max-w-[280px] bg-white h-full shadow-2xl p-4 transition-transform duration-300 ease-out transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close trigger inside drawer */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-800 text-lg">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none hover:bg-gray-100 transition-all"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="h-[calc(100vh-80px)] pb-10">
            {sidebarContent}
          </div>
        </div>
      </div>
    </>
  );
}
