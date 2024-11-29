import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <div>Register Page</div>,
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
  },
  {
    path: "/users",
    element: <div>Users Page</div>,
  },
  {
    path: "/products",
    element: <div>Products Page</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
