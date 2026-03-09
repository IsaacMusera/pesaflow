import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";

function RedirectToHome() {
  return <Navigate to="/" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    Component: Layout,
    children: [
      { path: "/dashboard", Component: Dashboard },
      { path: "/transactions", Component: Transactions },
    ],
  },
  {
    path: "*",
    Component: RedirectToHome,
  },
]);