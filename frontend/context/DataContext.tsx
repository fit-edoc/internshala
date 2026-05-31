"use client"

import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Internship {
  id: number;
  title: string;
  profile_name: string;
  company_name: string;
  company_logo: string;
  work_from_home: boolean;
  location_names: string[];
  locations: Array<{
    string: string;
    link: string;
    country: string;
    region: string | null;
    locationName: string;
  }>;
  start_date: string;
  duration: string;
  stipend: {
    salary: string;
    tooltip: string | null;
    salaryValue1: number;
    salaryValue2: number | null;
    salaryType: string;
    currency: string;
    scale: string;
    large_stipend_text: boolean;
  };
  posted_on: string;
  postedOnDateTime: number;
  application_deadline: string;
  expiring_in: string;
  posted_by_label: string;
  posted_by_label_type: string;
  is_active: boolean;
  labels: any[];
}

export interface Filters {
  profile: string;
  location: string;
  duration: string; // e.g. "", "1 Month", "2 Months", "3 Months", "6 Months"
  minStipend: number;
  search: string;
  sortBy: string; // "newest" | "highest_stipend" | "shortest_duration"
}

type DataContextType = {
  internships: Internship[];
  isLoading: boolean;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const initialFilters: Filters = {
  profile: "",
  location: "",
  duration: "",
  minStipend: 0,
  search: "",
  sortBy: "newest",
};



export const DataContext = createContext<DataContextType>({
  internships: [],
  isLoading: true,
  filters: initialFilters,
  setFilters: () => {},
});

export const DataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>(initialFilters);


  const api_url = process.env.NEXT_PUBLIC_API_URL || "https://internshala.com/hiring/search";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
         api_url
        );

        if (response.data && response.data.internships_meta) {
          setInternships(Object.values(response.data.internships_meta));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ internships, isLoading, filters, setFilters }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);