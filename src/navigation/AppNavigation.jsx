import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AuthPage from "../pages/Auth/AuthPage";
import NotFound from "../pages/UnknowRoute/NotFound";
import ManagerDashboard from "../pages/Dashboard/DashboardPage";
import ManagerCreatePass from "../pages/CreatePass/CreatePass";
import PassPreview from "../pages/PassPreview/PassPreview";
import ManagerPassHistory from "../pages/PassHistory/ManagerPassHistory";

function AppNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}

        <Route path="/" element={<AuthPage />} />

        {/* Protected Manager Route */}

        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute requiredRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/create-ticket"
          element={
            <ProtectedRoute requiredRole="manager">
              <ManagerCreatePass />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/pass-preview/:ticketId"
          element={
            <ProtectedRoute requiredRole="manager">
                <PassPreview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager/pass-history"
          element={
            <ProtectedRoute requiredRole="manager">
                <ManagerPassHistory />
            </ProtectedRoute>
          }
        />

        {/* Unknown routes */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppNavigation;
