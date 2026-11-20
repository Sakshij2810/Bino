import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router";

type AuthFormProps = {
  mode: "login" | "signup";
};
const AuthForm = ({ mode }: AuthFormProps) => {
  const isSignup = mode === "signup";

  const { user, checking, setUser } = useAuthStore();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();

  const destination = location.state?.from ?? "/profile";

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const body = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const { data } = await api.post(
        isSignup ? "/auth/signup" : "/auth/login",
        body,
      );
      setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) return <p className="text-zinc-400">Checking session…</p>;
  if (user) return <Navigate to={destination} replace />;
  return (
    <section className="panel mx-auto max-w-md">
      <h1 className="page-title">
        {isSignup ? "Create an account" : "Log in"}
      </h1>

      <form className="mt-7 grid gap-5" onSubmit={handleSubmit}>
        {isSignup && (
          <label className="field">
            Username
            <input
              name="username"
              type="text"
              autoComplete="username"
              minLength={2}
              maxLength={30}
              required
            />
          </label>
        )}

        <label className="field">
          Email
          <input name="email" autoComplete="email" type="email" required />
        </label>

        <label className="field">
          Password
          <input
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            minLength={8}
            maxLength={72}
            required
          />
        </label>

        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Please wait…" : isSignup ? "Create account" : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-sm text-zinc-400">
        {isSignup ? "Already have an account? " : "New to Exchange? "}
        <Link
          className="text-zinc-100 underline"
          to={isSignup ? "/login" : "/signup"}
        >
          {isSignup ? "Log in" : "Sign up"}
        </Link>
      </p>
    </section>
  );
};

export default AuthForm;
