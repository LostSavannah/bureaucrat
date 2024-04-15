import { useEffect, useState } from "react";
import { BureaucratWorkersService } from "../../services/BureaucratWorkersService";
import { WorkerLog, WorkerStatus, WorkerStep } from "../../types/Workers";
import { Dict } from "../../types/Common";

export function useWorkerEvents(kind:string, id:string){
    const [workerStatus, setWorkerStatus] = useState<number>(0);
    const [workerLogs, setWorkerLogs] = useState<WorkerLog[]>([]);
    const [workerStep, setWorkerStep] = useState<WorkerStep>({max:0, name: "", value: 0});
    const [workerMeta, setWorkerMeta] = useState<{[key:string]: string}>({});

    function add<T>(source:EventSource, event:string, callable:(item:T) => void){
        source.addEventListener(event, e => callable(JSON.parse(e.data) as T))
    }

    useEffect(() => {
        const eventSource = new BureaucratWorkersService().listenStatus(kind, id, 1)
        add(eventSource, "update-status", setWorkerStatus);
        add(eventSource, "update-logs", setWorkerLogs);
        add(eventSource, "update-step", setWorkerStep);
        add(eventSource, "update-meta", setWorkerMeta);
        return () => eventSource.close();
    }, [kind, id]);

    function setWorker(status: WorkerStatus){
        setWorkerStatus(status.status);
        setWorkerLogs(status.logs);
        setWorkerMeta(status.meta);
        setWorkerStep(status.step);
    }

    function sendCommand(command:string, params:Dict){
        new BureaucratWorkersService().sendCommand(kind, id, command, params).then(setWorker);
    }

    async function recycle(){
        new BureaucratWorkersService().recycle(kind, id).then(setWorker);
    }

    return {
        workerStatus,
        workerLogs,
        workerStep,
        workerMeta,
        sendCommand,
        recycle
    }
}