import { useMemo } from "react";
import { Internship, Filters } from "@/context/DataContext";

// Helper function to extract numeric month from a duration string (e.g., "3 Months" -> 3)
const parseDurationMonths = (durationStr: string): number => {
  const match = durationStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export const useFilteredInternships = (internships: Internship[], filters: Filters) => {
  const filtered = useMemo(() => {
    return internships.filter((item) => {
      // 1. Global Search (matches title/profile_name, company_name, or location_names)
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = item.title?.toLowerCase().includes(query) || item.profile_name?.toLowerCase().includes(query);
        const matchesCompany = item.company_name?.toLowerCase().includes(query);
        const matchesLocation = item.location_names?.some((loc) =>
          loc.toLowerCase().includes(query)
        ) || (item.work_from_home && "remote".includes(query) || "work from home".includes(query));

        if (!matchesTitle && !matchesCompany && !matchesLocation) {
          return false;
        }
      }

      // 2. Profile Filter (text search, case-insensitive, matches title/profile_name)
      if (filters.profile.trim()) {
        const profileQuery = filters.profile.toLowerCase().trim();
        const matchesProfile = item.title?.toLowerCase().includes(profileQuery) ||
                              item.profile_name?.toLowerCase().includes(profileQuery);
        if (!matchesProfile) {
          return false;
        }
      }

      // 3. Location Filter
      if (filters.location) {
        const locQuery = filters.location.toLowerCase();
        if (locQuery === "remote" || locQuery === "work from home") {
          if (!item.work_from_home) {
            return false;
          }
        } else {
          // If searching for a specific location
          const matchesLoc = item.location_names?.some((loc) =>
            loc.toLowerCase().includes(locQuery)
          );
          if (!matchesLoc) {
            return false;
          }
        }
      }

      // 4. Duration Filter (max duration filter: matches internships with duration <= selected)
      if (filters.duration) {
        const filterMonths = parseDurationMonths(filters.duration);
        const itemMonths = parseDurationMonths(item.duration || "");
        if (filterMonths > 0 && itemMonths > 0 && itemMonths > filterMonths) {
          return false;
        }
      }

      // 5. Stipend Filter (matches stipend.salaryValue1 >= minStipend)
      if (filters.minStipend > 0) {
        const stipendVal = item.stipend?.salaryValue1 || 0;
        if (stipendVal < filters.minStipend) {
          return false;
        }
      }

      return true;
    });
  }, [internships, filters]);

  // Apply sorting
  const sortedAndFiltered = useMemo(() => {
    const list = [...filtered];

    if (filters.sortBy === "newest") {
      // Sort by postedOnDateTime descending (highest timestamp first)
      list.sort((a, b) => b.postedOnDateTime - a.postedOnDateTime);
    } else if (filters.sortBy === "highest_stipend") {
      // Sort by stipend.salaryValue1 descending
      list.sort((a, b) => {
        const stipendA = a.stipend?.salaryValue1 || 0;
        const stipendB = b.stipend?.salaryValue1 || 0;
        return stipendB - stipendA;
      });
    } else if (filters.sortBy === "shortest_duration") {
      // Sort by duration ascending
      list.sort((a, b) => {
        const durA = parseDurationMonths(a.duration || "");
        const durB = parseDurationMonths(b.duration || "");
        return durA - durB;
      });
    }

    return list;
  }, [filtered, filters.sortBy]);

  return sortedAndFiltered;
};
