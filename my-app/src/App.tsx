import React, { useState } from "react";
import Users from "./pages/Users";
import Products from "./pages/Products";

const App = () => {
  const [activeTab, setActiveTab] = useState<"users" | "products">("users"); // Default tab is "users"

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
     {/* Tabs Section */}
      <div className="flex justify-center border-b mb-2">
        <button
          className={`px-6 py-2 text-lg font-medium ${
            activeTab === "users" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`px-6 py-2 text-lg font-medium ${
            activeTab === "products" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
      </div>

      {/* Show the selected component */}
      {activeTab === "users" ? <Users /> : <Products />}
    </div>
  );
};

export default App;
