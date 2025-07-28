import { Result } from "../types/Result";
import BaseHttpService from "./BaseHttpService";

export class BureaucratTemplatesService extends BaseHttpService{
    constructor(){
        super();
    }

    async getTemplates(){
        return (await this.get<Result<string[]>>(`${this.baseUrl}/templates/template`)).result;
    }

    async getRenders(){
        return (await this.get<Result<string[]>>(`${this.baseUrl}/templates/render`)).result;
    }

    async getParsers(){
        return (await this.get<Result<string[]>>(`${this.baseUrl}/templates/parser`)).result;
    }

    async getTemplate(id:string){
        return (await this.get<Result<string>>(`${this.baseUrl}/templates/template/${id}`)).result;
    }

    async setTemplate(id:string, data:string){
        return (await this.post<string, Result<{template:string}>>(
            `${this.baseUrl}/templates/template/${id}`,
            data,
            false
        )).result;
    }

    async deleteTemplate(id:string){
        return (await this.delete<Result<{template:string}>>(`${this.baseUrl}/templates/template/${id}`)).result;
    }

    async executeTemplate(id:string, data:string, render:string, parser:string){
        return (await this.put<string, Result<{contentType:string, data:string}>>(
            `${this.baseUrl}/templates/template/${id}?render=${render}&parser=${parser}`,
            data,
            false
        )).result;
    }
}