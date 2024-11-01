import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import { Dashboard } from "./pages/dashboard/dashboard";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "*", 
        element: <Navigate to="/register" replace />, 
      },
    ]
  }
]);

export { router };