import { useAuthStore } from "@/store/useAuthStore";
import React, { type ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, checking, sessionError } = useAuthStore();

  if (checking) {
    <p className="text-zinc-400">Checking session…</p>;
  }

  if (sessionError) {
    <div>
      <p role="alert" className="error">
        {sessionError}
      </p>
      <button
        className="btn-secondary mt-4"
        onClick={() => window.location.reload()}
      >
        Retry
      </button>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};

export default ProtectedRoute;
