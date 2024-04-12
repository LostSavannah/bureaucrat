import BaseHttpService from "./BaseHttpService";

export class BureaucratTemplatesService extends BaseHttpService{
    constructor(){
        super();
    }

    async getTemplates(){
        return await this.get<string[]>(`${this.baseUrl}/templates/template`);
    }

    async getRenders(){
        return await this.get<string[]>(`${this.baseUrl}/templates/render`);
    }

    async getParsers(){
        return await this.get<string[]>(`${this.baseUrl}/templates/parser`);
    }

    async getTemplate(id:string){
        return await this.get<string>(`${this.baseUrl}/templates/template/${id}`);
    }

    async setTemplate(id:string, data:string){
        return await this.post<string, {template:string}>(
            `${this.baseUrl}/templates/template/${id}`,
            data,
            false
        )
    }

    async deleteTemplate(id:string){
        return await this.delete<{template:string}>(`${this.baseUrl}/templates/template/${id}`);
    }

    async executeTemplate(id:string, data:string, render:string, parser:string){
        return await this.put<string, {contentType:string, data:string}>(
            `${this.baseUrl}/templates/template/${id}?render=${render}&parser=${parser}`,
            data,
            false
        )
    }
}