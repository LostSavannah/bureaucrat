import { Link } from "react-router-dom";
import { useWorkerKindView } from "./useWorkerKindView";

export default function WorkerKindView({kind}:{kind:string}) {
  const {kindStatistics} = useWorkerKindView(kind);
  function getKindShortName(kind:string){
    const parts = kind.split(".");
    parts.reverse();
    return parts[0]
  }
  return (
    <div className="p-2">
        <div className="card p-2">
            <h5>{getKindShortName(kind)}</h5>
            <h6>({kind})</h6>
            {kindStatistics && <div className="w-100">
                <div className="w-100 p-1 d-flex justify-content-around">
                  <span>Active</span> 
                  <span className="badge text-bg-success">
                    {kindStatistics.active} / {kindStatistics.count}
                  </span>
                </div>
                <div className="w-100 p-1 d-flex justify-content-around">
                  <span>Paused</span> 
                  <span className="badge text-bg-warning">
                    {kindStatistics.paused} / {kindStatistics.count}
                  </span>
                </div>
                <div className="w-100 p-1 d-flex justify-content-around">
                  <span>Stopped</span> 
                  <span className="badge text-bg-dark">
                    {kindStatistics.stopped} / {kindStatistics.count}
                  </span>
                </div>
            </div>}
            <Link to={`/workers-page/${kind}`}>
                <button className="w-100 btn btn-primary">Manage</button>
            </Link>
        </div>
    </div>
  )
}
