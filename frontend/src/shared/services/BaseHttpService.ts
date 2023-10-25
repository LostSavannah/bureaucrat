export default class BaseHttpService{
    
    protected baseUrl:string = "http://localhost:19760";

    protected get<TResult>(url:string):Promise<TResult>{
        return new Promise<TResult>((resolve, reject) => {
            fetch(url, {
                method: "get"
            }).then(response => {
                response.json()
                    .then(result => resolve(result as TResult))
                    .catch(reject);
            }).catch(reject);
        });
    }
    
    protected post<T, TResult>(url:string, parameter:T):Promise<TResult>{
        return new Promise<TResult>((resolve, reject) => {
            fetch(url, {
                method: "post",
                body: JSON.stringify(parameter)
            }).then(response => {
                response.json()
                    .then(result => resolve(result as TResult))
                    .catch(reject);
            }).catch(reject);
        });
    }
    
    protected delete<TResult>(url:string):Promise<TResult>{
        return new Promise<TResult>((resolve, reject) => {
            fetch(url, {
                method: "delete"
            }).then(response => {
                response.json()
                    .then(result => resolve(result as TResult))
                    .catch(reject);
            }).catch(reject);
        });
    }
}