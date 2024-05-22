import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./constants/routes";
import { DepartmentsProvider } from "./providers/departments/departments.provider";
import { WindowsProvider } from "./providers/windows/windows.provider";
import { QueuesProvider } from "./providers/queues/queues.provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DepartmentsProvider>
      <WindowsProvider>
        <QueuesProvider>
          <RouterProvider router={routes} />
        </QueuesProvider>
      </WindowsProvider>
    </DepartmentsProvider>
  </React.StrictMode>
);
