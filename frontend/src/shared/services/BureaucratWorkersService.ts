import { Dict } from "../types/Common";
import { KindStatistics, WorkerStatus } from "../types/Workers";
import BaseHttpService from "./BaseHttpService";

export class BureaucratWorkersService extends BaseHttpService{
    constructor(){
        super();
    }

    listWorkerKinds(){
        return this.get<string[]>(`${this.baseUrl}/workers`);
    }

    listWorkersOfKind(kind:string){
        return this.get<string[]>(`${this.baseUrl}/workers/${kind}`);
    }

    getWorker(kind:string, id:string){
        return this.get<WorkerStatus>(`${this.baseUrl}/workers/${kind}/${id}`);
    }

    createWorker(kind:string){
        return this.post<null, WorkerStatus>(`${this.baseUrl}/workers/${kind}/create`, null);
    }

    getKindStatistics(kind:string){
        return this.get<KindStatistics>(`${this.baseUrl}/workers/${kind}/statistics`);
    }

    deleteWorker(kind:string, id:string){
        return this.delete<{id:string}>(`${this.baseUrl}/workers/${kind}/${id}`);
    }

    sendCommand(kind:string, id:string, command:string, params:Dict){
        return this.post<Dict, WorkerStatus>(`${this.baseUrl}/workers/${kind}/${id}/${command}`, params);
    }

    recycle(kind:string, id:string){
        return this.post<Dict, WorkerStatus>(`${this.baseUrl}/workers/${kind}/${id}/recycle`, {});
    }

    listenStatus(kind:string, id:string, interval:number){
        return this.listen(`${this.baseUrl}/workers/${kind}/${id}/stream/${interval}`);
    }
}