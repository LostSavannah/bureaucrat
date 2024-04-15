import { useWorkerEvents } from "./useWorkerEvents";
import WorkerController from "./views/WorkerController";
import WorkerLogView from "./views/WorkerLogView";
import WorkerMetadataView from "./views/WorkerMetadataView";
import WorkerStatusView from "./views/WorkerStatusView";

export default function WorkerView({id, kind}:{id:string, kind:string}) {
    const {
        workerStatus,
        workerMeta,
        workerLogs,
        recycle, 
        sendCommand
    } = useWorkerEvents(kind, id);
    function getShortName(){
        return kind.split(".").pop()
    }
    return <div className="w-100 h-100">
                <h4>{getShortName()}</h4>
                <h5 className="text-secondary">{kind}: {id}</h5>
                    <div className="w-100 h-100 d-flex flex-column h-100">
                    <WorkerStatusView status={workerStatus}/>
                    <WorkerMetadataView meta={workerMeta}/>
                    <WorkerController
                        status={workerStatus}
                        terminate={recycle}
                        sendCommand={sendCommand}
                    ></WorkerController>
                    <WorkerLogView logs={workerLogs}/>
                </div>
        </div>
}
