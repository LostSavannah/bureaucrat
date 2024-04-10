import TableComponent from "../table/TableComponent";
import { useFileUpload } from "./useFileUpload";

export interface FileUploadProps{
    onUpload: (path:string, files:{[key:string]: string}) => void
}

export default function FileUpload({onUpload}:FileUploadProps) {
    
    const {loading, files, path, onFileUpload, removeFile, setPath, upload} = useFileUpload(onUpload);

    async function handleFileUpload(event:React.ChangeEvent<HTMLInputElement>){
        if(event.target.files){
            const filesList:File[] = await new Promise((resolve, reject) => {
                try{
                    const filesList:File[] = []
                    for(let index = 0; index < event.target.files!.length; index++){
                        filesList.push(event.target.files![index]);
                    }
                    resolve(filesList);
                }catch{
                    reject()
                }
            });
            onFileUpload(filesList);
        }
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
        {loading ? <>Loading...</>: <>
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
        </>}
    </>
  )
}
