import React from "react";
import { Internship } from "@/context/DataContext";

interface InternshipCardProps {
  internship: Internship;
}

// Generate a deterministic color background based on the company name
const getLogoColor = (companyName: string) => {
  return "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100";
};

export default function InternshipCard({ internship }: InternshipCardProps) {
  const isPpo = internship.labels?.some((lbl: any) =>
    lbl?.label_value?.includes("PPO") || (internship as any).ppo_label_value === "With job offer"
  ) || (internship as any).is_ppo;

  const locationsText = internship.work_from_home
    ? "Work From Home"
    : internship.location_names && internship.location_names.length > 0
    ? internship.location_names.join(", ")
    : "Multiple Locations";

  return (
    <article className="bg-card text-card-foreground border border-border rounded-lg p-5 md:p-6 shadow-xs hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 relative group flex flex-col gap-4">
      {/* Top Banner Tag for Special Statuses */}
      {internship.is_active && (
        <div className="absolute top-4 right-4 flex gap-1.5">
          {isPpo && (
            <span className="bg-zinc-100 dark:bg-zinc-900 border border-border text-zinc-800 dark:text-zinc-300 text-[10px] md:text-xs font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
              <svg className="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              With job offer
            </span>
          )}
          {internship.work_from_home && (
            <span className="bg-zinc-100 dark:bg-zinc-900 border border-border text-zinc-800 dark:text-zinc-300 text-[10px] md:text-xs font-semibold px-2.5 py-0.5 rounded-md shadow-2xs">
              Remote
            </span>
          )}
        </div>
      )}

      {/* Title & Company Name */}
      <div className="flex gap-4 items-start pr-24">
        {/* Colorful corporate initial logo */}
        <div
          className={`w-10 h-10 flex-shrink-0 rounded-md flex items-center justify-center font-semibold text-sm shadow-2xs select-none ${getLogoColor(
            internship.company_name
          )}`}
        >
          {internship.company_name.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground tracking-tight text-base group-hover:text-sky-500 transition-colors">
            {internship.profile_name || internship.title}
          </h3>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
            {internship.company_name}
          </span>
        </div>
      </div>

      {/* Metadata fields (Locations, Duration, Stipend) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2.5 border-y border-border my-1 text-xs md:text-sm">
        {/* Location */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
            Location
          </span>
          <div className="flex items-center gap-1 text-foreground font-medium truncate">
            <svg
              className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="truncate" title={locationsText}>
              {locationsText}
            </span>
          </div>
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
            Start Date
          </span>
          <div className="flex items-center gap-1 text-foreground font-medium">
            <svg
              className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
            <span className="truncate">{internship.start_date || "Immediately"}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
            Duration
          </span>
          <div className="flex items-center gap-1 text-foreground font-medium">
            <svg
              className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span className="truncate">{internship.duration}</span>
          </div>
        </div>

        {/* Stipend */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
            Stipend
          </span>
          <div className="flex items-center gap-1 text-foreground font-medium">
            <svg
              className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate font-semibold text-foreground">
              {internship.stipend?.salary || "Unpaid"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-1 pt-2">
        {/* Left Side: Posted Date Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
          <svg
            className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-750 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="bg-zinc-100 dark:bg-zinc-900 border border-border px-2 py-0.5 rounded text-zinc-500 dark:text-zinc-400 text-[11px] font-medium">
            {internship.posted_by_label || internship.posted_on}
          </span>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all px-3 py-1.5 border border-border rounded-full focus:outline-none shadow-2xs cursor-pointer"
          >
            View Details
          </button>
          <button
            type="button"
            className="bg-linear-to-l from-sky-500 to-sky-200 dark:bg-zinc-50 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 text-zinc-50 dark:text-zinc-900 font-medium text-xs md:text-sm px-4 py-1.5 rounded-full transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
    </article>
  );
}
