import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import { Dashboard } from "./pages/dashboard/dashboard";
import CreateDepartment from "./pages/department/department";
import { Setup } from "./pages/setup/setup";
import SetupRoute from "./routes/protected";

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
        path: "/departments",
        element: <CreateDepartment />
      },
      {
        path: "/setup",
        element: <SetupRoute><Setup /></SetupRoute>
      },
      {
        path: "*", 
        element: <Navigate to="/register" replace />, 
      },
    ]
  }
]);

export { router };
