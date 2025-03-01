import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import DataTable from "../components/Table";
import { RootState, AppDispatch } from "../redux/store";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.data || []);
  const loading = useSelector((state: RootState) => state.users.loading);
  const totalUsers = useSelector((state: RootState) => state.users.total || 0);

  const [pageSize, setPageSize] = useState(5);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<{ key: string; value: string }>({ key: "", value: "" });

  useEffect(() => {
    dispatch(fetchUsers({ limit: pageSize, skip, filterKey: filters.key, filterValue: filters.value }));
  }, [dispatch, pageSize, skip, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ key, value });
    setSkip(0);
  };

  const filterOptions = [
    { key: "firstName", label: "NAME", type: "text" as const },
    { key: "email", label: "EMAIL", type: "text" as const },
    { key: "birthDate", label: "DATE OF BIRTH", type: "text" as const },
    {
      key: "gender",
      label: "Gender",
      type: "select" as const,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-10 bg-white shadow-lg rounded-lg">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <DataTable
          data={users}
          columns={["FIRST NAME", "LAST NAME", "MAIDEN NAME", "EMAIL", "AGE", "USERNAME", "DATE OF BIRTH", "BLOODGROUP", "EYE COLOR", "Gender"]}
          keys={["firstName", "lastName", "maidenName", "email", "age", "username", "birthDate", "bloodGroup", "eyeColor", "gender"]}
          pageSize={pageSize}
          setPageSize={setPageSize}
          skip={skip}
          setSkip={setSkip}
          totalItems={totalUsers}
          filters={filters}
          setFilters={handleFilterChange}
          filterOptions={filterOptions}
        />
      )}
    </div>
  );
};

export default Users;
