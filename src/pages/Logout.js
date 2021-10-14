import React, { useEffect } from "react";
import { useAuth } from "../providers/Auth";
import withAuth from "../hocs/withAuth";

const Logout = () => {
  const { logout } = useAuth();
  useEffect(() => {
    console.log("LoginOutlined");
    logout();
  }, []);
  return <p>Logging out...</p>;
};

export default withAuth(Logout, "/");
