import { useEffect, useState } from "react";
import { BureaucratWorkersService } from "../../services/BureaucratWorkersService";
import { KindStatistics } from "../../types/Workers";

export function useWorkerKindView(kind:string){
    const [kindStatistics, setKindStatistics] = useState<KindStatistics|null>(null);
    useEffect(() => {
        new BureaucratWorkersService()
            .getKindStatistics(kind)
            .then(setKindStatistics)
    }, [kind]);

    return {
        kindStatistics
    }
}