import React from "react";

interface FilterSectionProps {
  label: string;
  children: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

export default function FilterSection({
  label,
  children,
  onClear,
  showClear = false,
}: FilterSectionProps) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </label>
        {showClear && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors focus:outline-none"
          >
            Clear
          </button>
        )}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}
