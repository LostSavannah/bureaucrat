import { Result } from "../types/Result";
import { TreeIndex, TreeValue } from "../types/TreeResult";
import BaseHttpService from "./BaseHttpService";

export type QueryResult = {[key:string]:any}[]

export class BureaucratTreesService extends BaseHttpService{
    constructor(){
        super();
    }

    async getForests(){
        return await this.get<Result<string[]>>(`${this.baseUrl}/trees`);
    }

    async getTrees(forest:string){
        return await this.get<Result<string[]>>(`${this.baseUrl}/trees/${forest}`);
    }

    async getValue(forest:string, tree:string, path:string){
        const url:string = `${this.baseUrl}/trees/${forest}/${tree}/${path}`
        return await this.get<Result<TreeValue>>(url);
    }

    async getIndex(forest:string, tree:string, path:string){
        const url:string = `${this.baseUrl}/trees/${forest}/${tree}/index:${path}`
        return await this.get<Result<TreeIndex>>(url);
    }
    
    async setValue(forest:string, tree:string, path:string, value:TreeValue){
        const url:string = `${this.baseUrl}/trees/${forest}/${tree}/index:${path}`
        return await this.post<TreeValue, Result<string>>(url, value);
    }
}