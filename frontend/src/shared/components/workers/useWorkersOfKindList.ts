import { useEffect, useState } from "react";
import { BureaucratWorkersService } from "../../services/BureaucratWorkersService";

export function useWorkersOfKindList(initial_kind:string){
    const [kind, setKind] = useState(initial_kind);
    const [workers, setWorkers] = useState<string[]>([]);

    useEffect(() => {
        new BureaucratWorkersService().listWorkersOfKind(kind).then(workers => {
            setWorkers(workers);
        });
    }, [kind]);

    function removeWorker(id:string){
        const service = new BureaucratWorkersService();
        service.deleteWorker(kind, id).then(() => {
            service.listWorkersOfKind(kind).then(workers => {
                setWorkers(workers);
            });
        });
    }

    function createWorker(){        
        const service = new BureaucratWorkersService();
        service.createWorker(kind).then(() => {
            service.listWorkersOfKind(kind).then(workers => {
                setWorkers(workers);
            });
        });
    }

    return{
        workers,
        kind,
        setKind,
        removeWorker,
        createWorker
    }   
}