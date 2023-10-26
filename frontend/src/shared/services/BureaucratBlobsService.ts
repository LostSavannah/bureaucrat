import { BlobResult } from "../types/BlobResult";
import { Result } from "../types/Result";
import BaseHttpService from "./BaseHttpService";

export class BureaucratBlobsService extends BaseHttpService{
    constructor(){
        super();
    }
    async index(path:string){
        console.log(`Indexing: ${path}`);
        return await this.get<Result<BlobResult>>(`${this.baseUrl}/blobs/${path}`);
    }
}