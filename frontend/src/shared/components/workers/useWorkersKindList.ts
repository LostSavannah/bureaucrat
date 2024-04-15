import { useEffect, useState } from "react";
import { BureaucratWorkersService } from "../../services/BureaucratWorkersService";

export default function useWorkersKindList(){
    const [workers, setWorkers] = useState<string[]>([]);

    useEffect(() => {
        new BureaucratWorkersService()
            .listWorkerKinds()
            .then(setWorkers);
    }, []);

    return{
        workers
    }
}