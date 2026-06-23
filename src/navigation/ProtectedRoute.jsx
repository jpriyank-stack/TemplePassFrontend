import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProtectedRoute({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const checkToken = async () => {
      // no token
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        let endpoint = null;

        switch (userRole) {
          case "admin":
            endpoint = `${API_BASE_URL}/admin/check-token`;

            break;

          case "manager":
            endpoint = `${API_BASE_URL}/manager/check-token`;

            break;

          case "user":
            endpoint = `${API_BASE_URL}/user/check-token`;

            break;

          default:
            setIsAuthorized(false);
            return;
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        /**
         * expected:
         * {
         *  success:true,
         *  data:{
         *    role:"manager"
         *  }
         * }
         */

        if (!response.data.success) {
          throw new Error("Invalid token");
        }

        const apiRole = response.data.data?.role;

        // role mismatch

        if (requiredRole && apiRole !== requiredRole) {
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.log("Token failed", error);

        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");

        setIsAuthorized(false);
      }
    };

    checkToken();
  }, [token, userRole, requiredRole]);

  if (isAuthorized === null) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}
