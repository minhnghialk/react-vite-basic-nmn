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
import { AuthWrapper } from "./components/context/auth.context.jsx";
import PrivateRoute from "./pages/Private.Route";
import "nprogress/nprogress.css";

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

      // {
      //   path: "/books",
      //   element: (
      //     <PrivateRoute>
      //       <BooksPage />
      //     </PrivateRoute>
      //   ),
      // },
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
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
