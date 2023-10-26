import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainPage from "./shared/pages/MainPage";
import DefaultPage from "./shared/pages/DefaultPage";
import QueuesPage from "./shared/pages/QueuesPage";
import BlobsPage from "./shared/pages/BlobsPage";
import TablesPage from "./shared/pages/TablesPage";
import ErrorPage from "./shared/pages/ErrorPage";
import QueueDetailPage from "./shared/pages/QueueDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    errorElement: <ErrorPage></ErrorPage>,
    children:[
      {
        path: "/",
        element: <DefaultPage></DefaultPage>
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
        path: "/tables-page",
        element: <TablesPage></TablesPage>
      }
    ]
  }
]);

export default function App(){
  return <RouterProvider router={router}></RouterProvider>;
}