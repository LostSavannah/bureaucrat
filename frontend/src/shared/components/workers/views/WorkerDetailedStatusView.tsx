import { useWorkerStatus } from "./useWorkerStatus";

export interface WorkerDetailedStatusViewProps{
    kind: string,
    id: string
}
export default function WorkerDetailedStatusView({kind, id}:WorkerDetailedStatusViewProps) {
  const workerStatus = useWorkerStatus(kind, id);
  function getStatusIcon(status:number){
    return {
        1: "💀",
        2: "🔄",
        3: "✋",
        4: "⚡"
    }[status]
  }
  return (
    <div className="d-flex">{
        workerStatus ? <div>
            <span>{getStatusIcon(workerStatus.status)}</span>
            <span>{workerStatus.step.name}</span>
        </div> : 
        <span>🔄</span>
    }</div>
  )
}
