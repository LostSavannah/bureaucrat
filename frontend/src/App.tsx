import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MainPage from "./shared/pages/MainPage";
import DefaultPage from "./shared/pages/DefaultPage";
import QueuesPage from "./shared/pages/QueuesPage";
import BlobsPage from "./shared/pages/BlobsPage";
import TablesPage from "./shared/pages/TablesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    children:[
      {
        path: "/",
        element: <DefaultPage></DefaultPage>
      },
      {
        path: "/queues",
        element: <QueuesPage></QueuesPage>
      },
      {
        path: "/blobs",
        element: <BlobsPage></BlobsPage>
      },
      {
        path: "/tables",
        element: <TablesPage></TablesPage>
      }
    ]
  }
]);

export default function App(){
  return <RouterProvider router={router}></RouterProvider>;
}