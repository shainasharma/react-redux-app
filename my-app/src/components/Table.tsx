import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Filters from "./Filters"; // Import Filters

interface Props {
  data: any[];
  columns: string[];
  keys: string[];
  pageSize: number;
  setPageSize: (size: number) => void;
  skip: number;
  setSkip: (skip: number) => void;
  totalItems: number;
  filters: { key: string; value: string };
  setFilters: (key: string, value: string) => void;
  filterOptions: { key: string; label: string; type: "text" | "select"; options?: { label: string; value: string }[] }[];
}

const DataTable: React.FC<Props> = ({
  data,
  columns,
  keys,
  pageSize,
  setPageSize,
  skip,
  setSkip,
  totalItems,
  filters,
  setFilters,
  filterOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Client-side filtering
  const filteredData = data.filter((item) =>
    keys.some((key) => item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="overflow-x-auto p-6">

      <div className="flex items-center justify-start gap-1 columns-3">
        {/* Page Size Selection */}
        <div className="flex justify-start mt-6">
          <select
            className="border-0 px-2 py-1 rounded-md"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setSkip(0);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>          
          <label className="mr-2 text-gray-700 font-semibold ">Entries</label>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mt-6">
          <FaSearch
            className="cursor-pointer text-gray-600 mr-2"
            onClick={() => setShowSearch(!showSearch)} // Toggle input visibility
          />
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 w-35 rounded-md"
            />
          )}
        </div>
        
      {/* Filters Inside DataTable */}
      <Filters filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 shadow-md rounded-lg min-w-max">
          <thead>
            <tr className="bg-blue-500 text-white">
              {columns.map((col, index) => (
                <th key={index} className="py-2 px-4 text-customBlack bg-customBlue">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-gray-100">
                  {keys.map((key, colIndex) => (
                    <td key={colIndex} className="py-2 px-4">{item[key]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setSkip(Math.max(skip - pageSize, 0))}
          disabled={skip === 0}
          className={`px-3 py-1 rounded ${skip === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Previous Page
        </button>
        <span className="px-3 py-1">
          Page {Math.floor(skip / pageSize) + 1} of {Math.ceil(totalItems / pageSize)}
        </span>

        <button
          onClick={() => setSkip(skip + pageSize)}
          disabled={skip + pageSize >= totalItems}
          className={`px-3 py-1 rounded ${skip + pageSize >= totalItems ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DataTable;
