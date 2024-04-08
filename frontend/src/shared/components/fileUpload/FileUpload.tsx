import { useState } from "react";
import { getBase64 } from "../../tools";
import TableComponent from "../table/TableComponent";

export interface FileUploadProps{
    onUpload: (path:string, files:{[key:string]: string}) => void
}

export default function FileUpload({onUpload}:FileUploadProps) {
    const [files, setFiles] = useState<{[key:string]: string}>({});
    const [path, setPath] = useState("");
    async function handleFileUpload(event:React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            const localFiles = {...files};
            for(let index = 0; index < event.target.files.length; index++){
                const file = event.target.files[index];
                const base64 = (await getBase64(file)).split(',')[1];
                localFiles[file.name] = base64;
            }
            setFiles({...localFiles});
        }
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
  return (
    <>
        <div className="w-100 d-flex align-items-center">
            <h5>Upload</h5>
        </div>
        <div className="w-100">
        <TableComponent
                        items={Object.keys(files).map(file => file)}
                        columns={{
                            "Name": f => <>{f}</>,
                            "": f => <button 
                                className="btn btn-danger" 
                                onClick={() => removeFile(f)}>X</button>
                        }}
                        keySelector={f => f}
                    ></TableComponent>
                    <input 
                        style={{display: "none"}} 
                        onChange={handleFileUpload} id="fileUpload" type="file" multiple/>
        </div>
        
        <label className="btn btn-success w-100" htmlFor="fileUpload">Add files...</label>
        <div className="w-100 d-flex align-items-center">
            <span className="p-2">Path: </span>
            <input 
                className="form-control"
                value={path}
                onChange={e => setPath(e.target.value)}
                placeholder="Upload path"
                ></input>
        </div>
        <button className="btn btn-primary w-100" onClick={upload}>Upload</button>
        
    </>
  )
}
