import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import './index.css';
import Root from "./routes/root";
import Home from "./routes/home";
import PaperList from "./routes/paper-list/paperList";
import Exam from "./routes/paper-list/exam";
import Point from "./routes/paper-list/point";
import "@arco-design/web-react/dist/css/arco.css";
import Login from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "exam",
        children: [
          {
            path: "list/:subject",
            element: <PaperList />,
          },
          {
            path: "take/:id/:paperId",
            element: <Exam />,
          },
          {
            path: "point/:studentId",
            element: <Point />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
