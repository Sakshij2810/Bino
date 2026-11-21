import { useSession } from "@/hooks/useSession";
import { useAuthStore } from "@/store/useAuthStore";
import React, { type ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuthStore();
  const { isPending, isError, error } = useSession();
  if (isPending) {
    <p className="text-zinc-400">Checking session…</p>;
  }

  if (isError) {
    <div>
      <p role="alert" className="error">
        {error?.message}
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
