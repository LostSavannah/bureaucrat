import { Link } from "react-router-dom";
import Table from "../table/Table";
import { useWorkersOfKindList } from "./useWorkersOfKindList";
import WorkerDetailedStatusView from "./views/WorkerDetailedStatusView";

export interface WorkersOfKindListProps{
    kind:string
}

export default function WorkersOfKindList({kind}:WorkersOfKindListProps) {
    const {workers, removeWorker, createWorker} = useWorkersOfKindList(kind);
    return (        
        <div className="w-100">
              <div className="d-flex flex-row align-items-center justify-content-start">
                  <h4>{kind}</h4>
                  <button 
                      onClick={() => createWorker()}
                      className="m-2 btn btn-warning">+</button>
              </div>
            <div className="w-100">
              <Table
                  items={workers}
                  getId={w => w}
                  columns={[
                      {
                          name: "Worker",
                          renderer: w => <span>{w}</span>
                      },{
                          name: "Status",
                          renderer: w => <WorkerDetailedStatusView kind={kind} id={w}/>
                      },{
                          name: "Actions",
                          displayName: "",
                          renderer: w => <>
                              <Link to={`/workers-page/${kind}/${w}`}>
                                  <button className="btn btn-success">⚙</button>
                              </Link>
                              <button className="btn btn-danger"
                                  onClick={() => removeWorker(w)}
                              >⛔</button>
                          </>
                      }
                  ]}
              ></Table>
            </div>
        </div>
      )
}
