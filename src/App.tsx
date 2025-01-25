import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import AuthLayout from "./layout/Auth";
import { Dashboard, ErrorPage, Login, Tracker } from "./pages";
import MainLayout from "./layout/Main";
import { ProgressBar } from "./helpers/Functions";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "tracking",
          element: <Tracker />,
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback={<ProgressBar />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
