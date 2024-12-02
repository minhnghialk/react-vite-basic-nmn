import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import BooksPage from "./pages/BookPage.jsx";
import "./styles/global.css";
import TodoApp from "./components/todo/TodoApp.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },

      {
        path: "/users",
        element: <UsersPage />,
      },

      {
        path: "/books",
        element: <BooksPage />,
      },
    ],
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
