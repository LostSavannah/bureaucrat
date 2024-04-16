import { Dict } from "../types/Common";
import { KindStatistics, WorkerStatus } from "../types/Workers";
import BaseHttpService from "./BaseHttpService";

export class BureaucratWorkersService extends BaseHttpService{
    constructor(){
        super();
    }

    async listWorkerKinds(){
        return await this.get<string[]>(`${this.baseUrl}/workers/`);
    }

    async listWorkersOfKind(kind:string){
        return await this.get<string[]>(`${this.baseUrl}/workers/${kind}`);
    }

    async getWorker(kind:string, id:string){
        return await this.get<WorkerStatus>(`${this.baseUrl}/workers/${kind}/${id}`);
    }

    async createWorker(kind:string){
        return await this.post<null, WorkerStatus>(`${this.baseUrl}/workers/${kind}/create`, null);
    }

    async getKindStatistics(kind:string){
        return await this.get<KindStatistics>(`${this.baseUrl}/workers/${kind}/statistics`);
    }

    async deleteWorker(kind:string, id:string){
        return await this.delete<{id:string}>(`${this.baseUrl}/workers/${kind}/${id}`);
    }

    async sendCommand(kind:string, id:string, command:string, params:Dict){
        return await this.post<Dict, WorkerStatus>(`${this.baseUrl}/workers/${kind}/${id}/${command}`, params);
    }

    async recycle(kind:string, id:string){
        return this.post<Dict, WorkerStatus>(`${this.baseUrl}/workers/${kind}/${id}/recycle`, {});
    }

    listenStatus(kind:string, id:string, interval:number){
        return this.listen(`${this.baseUrl}/workers/${kind}/${id}/stream/${interval}`);
    }
}