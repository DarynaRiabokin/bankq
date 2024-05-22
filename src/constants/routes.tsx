import { createBrowserRouter } from "react-router-dom";
import { Root } from "../layouts/root.layout";
import { IndexPage } from "../pages/index.page";
import { MainLayout } from "../layouts/main.layout";
import { CreateQueuePage } from "../pages/create-queue.page";
import { AuthPage } from "../pages/auth.page";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <IndexPage />,
          },
        ],
      },
      {
        path: "/create-queue",
        element: <CreateQueuePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);
