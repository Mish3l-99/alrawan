import React from "react";
import { useSelector } from "react-redux";
import AdminLogin from "../../components/admin/AdminLogin";
import Dashboard from "../../components/admin/Dashboard";

const AdminBoard = () => {
  const admin = useSelector((state) => state.admin.value);
  return admin ? <Dashboard /> : <AdminLogin />;
};

export default AdminBoard;
