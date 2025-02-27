import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { RootState, AppDispatch } from "../store/store";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(fetchUsers(pageSize));
  }, [dispatch, pageSize]);

  // Define columns and keys for Users Table
  const userColumns = ["First Name", "Last Name", "Maiden Name", "Age", "Gender", "Email", "Username", "Blood Group", "Eye Color"];
  const userKeys = ["firstName", "lastName", "maidenName", "age", "gender", "email", "username", "bloodGroup", "eyeColor"];

  return (
    <div>
      <h2>Users List</h2>
      <div><Pagination onPageChange={setPageSize} /><p> Entries</p></div>
      {loading ? <p>Loading...</p> : <DataTable data={users} columns={userColumns} keys={userKeys} />}
    </div>
  );
};

export default Users;
