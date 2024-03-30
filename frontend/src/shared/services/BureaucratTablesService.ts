import { Result } from "../types/Result";
import BaseHttpService from "./BaseHttpService";

export type QueryResult = {[key:string]:any}[]

export class BureaucratTablesService extends BaseHttpService{
    constructor(){
        super();
    }

    async getDatabases(){
        return await this.get<Result<string[]>>(`${this.baseUrl}/tables/`);
    }

    async getTables(database:string){
        return await this.get<Result<string[]>>(`${this.baseUrl}/tables/${database}`);
    }

    async getRows(database:string, table:string, page_number:number, page_size:number){
        const url:string = `${this.baseUrl}/tables/${database}/${table}?page_number=${page_number}&page_size=${page_size}`
        return await this.get<Result<{[key:string]:any}[]>>(url);
    }

    async executeQuery(database:string, query:string){
        const url:string = `${this.baseUrl}/tables/${database}`;
        return await this.post<string, Result<QueryResult>>(url, query);
    }
}