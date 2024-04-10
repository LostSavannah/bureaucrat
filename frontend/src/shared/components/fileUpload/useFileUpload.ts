import { useState } from "react";
import { getBase64 } from "../../tools";

export function useFileUpload(onUpload: (path:string, files:{[key:string]: string}) => void){
    const [files, setFiles] = useState<{[key:string]: string}>({});
    const [path, setPath] = useState("");
    const [loading, setLoading] = useState(false);

    function onFileUpload(filesList:File[]){
        const localFiles = {...files};
        Promise.all(filesList.map(async f => {
            const base64 = (await getBase64(f)).split(',')[1];
            localFiles[f.name] = base64;
            console.log(f.name)
            return 1
        })).finally(() => {
            setFiles({...localFiles});
            setLoading(false);
        })
    }    
    
    function removeFile(filename:string){
        const localFiles = {...files};
        delete localFiles[filename];
        setFiles({...localFiles});
    }

    function upload(){
        onUpload(path, files);
        setFiles({});
    }

    return{
        onFileUpload,
        removeFile,
        upload,
        setPath,
        path,
        loading,
        files
    }
}