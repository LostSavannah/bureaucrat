import { Result } from "../types/Result";
import BaseHttpService from "./BaseHttpService";

export class BureaucratQueuesService extends BaseHttpService{
    constructor(){
        super();
    }

    async getQueues(){
        return await this.get<Result<string[]>>(`${this.baseUrl}/queues/`);
    }

    async deleteQueue(name:string){
        return await this.delete<Result<string>>(`${this.baseUrl}/queues/${name}`);
    }

    async dequeue(name:string){
        return await this.getRaw(`${this.baseUrl}/queues/${name}`);
    }

    async enqueue(name:string, content:string){
        return await this.post<string, Result<string>>(`${this.baseUrl}/queues/${name}`, content);
    }
}