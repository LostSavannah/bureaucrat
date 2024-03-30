import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainPage from "./shared/pages/MainPage";
import QueuesPage from "./shared/pages/QueuesPage";
import BlobsPage from "./shared/pages/BlobsPage";
import TablesPage from "./shared/pages/TablesPage";
import ErrorPage from "./shared/pages/ErrorPage";
import QueueDetailPage from "./shared/pages/QueueDetailPage";
import TableDetailPage from "./shared/pages/TableDetailPage";
import TreesExplorerPage from "./shared/pages/TreesExplorerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        path: "/",
        element: <QueuesPage></QueuesPage>
      },
      {
        path: "/queues-page",
        element: <QueuesPage></QueuesPage>
      },
      {
        path: "/queues-page/:queueName",
        element: <QueueDetailPage></QueueDetailPage>
      },
      {
        path: "/blobs-page",
        element: <BlobsPage></BlobsPage>
      },
      {
        path: "/tables-page/:database",
        element: <TablesPage></TablesPage>
      },
      {
        path: "/tables-page/:database/:table",
        element: <TableDetailPage></TableDetailPage>
      },
      {
        path: "/trees-page/:forest/:tree",
        element: <TreesExplorerPage></TreesExplorerPage>
      }
    ]
  }
], {basename: import.meta.env.VITE_BASENAME});

export default function App(){
  return <RouterProvider router={router}></RouterProvider>;
}