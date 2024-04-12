import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainPage from "./shared/pages/MainPage";
import QueuesPage from "./shared/pages/QueuesPage";
import BlobsPage from "./shared/pages/BlobsPage";
import TablesPage from "./shared/pages/TablesPage";
import ErrorPage from "./shared/pages/ErrorPage";
import QueueDetailPage from "./shared/pages/QueueDetailPage";
import TableDetailPage from "./shared/pages/TableDetailPage";
import TreesExplorerPage from "./shared/pages/TreesExplorerPage";
import TemplatesPage from "./shared/pages/TemplatesPage";
import TemplateRenderPage from "./shared/pages/TemplateRenderPage";

export default function App(){
  return <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
      <Routes>
        <Route path="/" element={<MainPage/>} errorElement={<ErrorPage/>}>
                <Route path="/" element={<QueuesPage/>}></Route>
                <Route path="/queues-page" element={<QueuesPage/>}/>
                <Route path="/queues-page/:queueName" element={<QueueDetailPage/>}/>
                <Route path="/blobs-page" element={<BlobsPage/>}></Route>
                <Route path="/tables-page/:database" element={<TablesPage/>}></Route>
                <Route path="/tables-page/:database/:table" element={<TableDetailPage/>}></Route>
                <Route path="/trees-page/:forest/:tree" element={<TreesExplorerPage/>}></Route>
                <Route path="/templates-page" element={<TemplatesPage/>}></Route>
                <Route path="/templates-page/:template/*" element={<TemplateRenderPage/>}></Route>
            </Route>
      </Routes>
  </BrowserRouter>
}