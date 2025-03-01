import React from "react";

interface FiltersProps {
  filters: { key: string; value: string };
  setFilters: (key: string, value: string) => void;
  filterOptions: {
    key: string;
    label: string;
    type: "text" | "select";
    options?: { label: string; value: string }[];
  }[];
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, filterOptions }) => {
  return (
    <div className="flex flex-wrap gap-4 p-4 justify-end">
      {filterOptions.map((filter) => (
        <div key={filter.key} className="w-full md:w-1/5">
          <label className="block text-sm font-bold mb-1">{filter.label}</label>
          {filter.type === "text" ? (
            <input
              type="text"
              value={filters.key === filter.key ? filters.value : ""}
              onChange={(e) => setFilters(filter.key, e.target.value)}
              className="border p-2 rounded w-full"
            />
          ) : (
            <select
              value={filters.key === filter.key ? filters.value : ""}
              onChange={(e) => setFilters(filter.key, e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">All</option>
              {filter.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default Filters;
