import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import { Dashboard } from "./pages/dashboard/dashboard";
import CreateDepartment from "./pages/department/listAll/department";
import { Setup } from "./pages/setup/setup";
import SetupRoute from "./routes/protected";
import DepartmentDetails from "./pages/department/id/departmentId";
import Repertorio from "./pages/songs/all/repertorio";
import SongVersions from "./pages/songVersion/all/songVersion";

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
        path: "/departments/:departmentId",
        element: <DepartmentDetails />
      },
      {
        path: "/songs",
        element: <Repertorio />
      },
      {
        path: "/setup",
        element: <SetupRoute><Setup /></SetupRoute>
      },
      {
        path: "/songs/:songId/song-versions",
        element: <SongVersions />
      },
      {
        path: "/songs/:songId/song-versions/:songVersionId",
        element: <SongVersions />
      },
      {
        path: "*", 
        element: <Navigate to="/register" replace />, 
      },
    ]
  }
]);

export { router };
