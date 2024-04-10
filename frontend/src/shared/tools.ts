export function base64ToBlob(rawBase64:string):Promise<Blob>{
    return new Promise<Blob>((resolve, reject) => {
        try{
            const arrayBuffer = new ArrayBuffer(rawBase64.length);
            const array = new Uint8Array(arrayBuffer);
            for(let i = 0; i < rawBase64.length; i++){
                array[i] = rawBase64.charCodeAt(i);
            }
            resolve(new Blob([array]));
        }catch(e){
            reject(e);
        }
    });
}

export function choose<T>(items:T[]){
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}

export function getBase64(file:File){
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (progress:ProgressEvent<FileReader>) => {
            console.log(progress)
            resolve(fileReader.result as string);
        };
        fileReader.onerror = (e) => {
            reject(e);
        };
        fileReader.readAsDataURL(file);
    });
}