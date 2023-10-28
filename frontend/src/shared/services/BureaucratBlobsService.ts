import { BlobResult } from "../types/BlobResult";
import { Result } from "../types/Result";
import BaseHttpService from "./BaseHttpService";

export class BureaucratBlobsService extends BaseHttpService{
    constructor(){
        super();
    }
    async index(path:string){
        return await this.get<Result<BlobResult>>(`${this.baseUrl}/blobs/${path}`);
    }
    async uploadFile(path:string, data:string){
        return await this.post<string, Result<string>>(`${this.baseUrl}/blobs/${path}`, data); 
    }
    
    async deleteFile(path:string){
        return await this.delete<Result<string>>(`${this.baseUrl}/blobs/${path}`); 
    }
}