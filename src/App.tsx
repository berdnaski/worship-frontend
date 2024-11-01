import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Register from "./pages/auth/register";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Register />
      }
    ]
  }
]);

export { router };