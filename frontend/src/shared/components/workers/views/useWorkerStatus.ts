import { useEffect, useState } from "react";
import { WorkerStatus } from "../../../types/Workers";
import { BureaucratWorkersService } from "../../../services/BureaucratWorkersService";

export function useWorkerStatus(kind:string, id:string){
    const [status, setStatus] = useState<WorkerStatus>()
    useEffect(() => {
        new BureaucratWorkersService()
            .getWorker(kind, id)
            .then(setStatus);
    }, [kind, id])
    return status;
}