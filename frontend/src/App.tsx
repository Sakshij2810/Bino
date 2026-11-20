import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/Home";
import PageLayout from "./components/PageLayout";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Stocks from "./pages/Stocks";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { api } from "./lib/api";
import axios from "axios";

export function App() {
  const { setUser, setChecking, setSessionError } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setChecking(true);
        const { data } = await api.get("/me");
        setUser(data?.user);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setUser(null);
        } else {
          setSessionError("Could not check your session. Try again.");
        }
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, [setUser, setChecking, setSessionError]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stocks"
            element={
              <ProtectedRoute>
                <Stocks />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
