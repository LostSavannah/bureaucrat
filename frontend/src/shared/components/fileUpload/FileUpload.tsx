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
            let localFiles = {...files};
            const file = event.target.files[0];
            const base64 = (await getBase64(file)).split(',')[1];
            localFiles[file.name] = base64;
            setFiles({...localFiles});
        }
    }
    function removeFile(filename:string){
        let localFiles = {...files};
        delete localFiles[filename];
        setFiles({...localFiles});
    }
    function upload(){
        onUpload(path, files);
        setFiles({});
    }
  return (
    <>
        <div className="container">
            <div className="row">
                <h5>Upload</h5>
            </div>
            <div className="row">
                <div className="col-auto">
                    <div className="form-group">
                        <label className="btn btn-primary" htmlFor="fileUpload">Select File</label>
                        <input style={{
                            "opacity": 0
                        }} onChange={handleFileUpload} id="fileUpload" type="file" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <TableComponent
                        items={Object.keys(files).map(file => file)}
                        columns={{
                            "Files": f => <>{f}</>,
                            "Actions": f => <button 
                                className="btn btn-danger" 
                                onClick={() => removeFile(f)}>Remove</button>
                        }}
                        keySelector={f => f}
                    ></TableComponent>
                    {}
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <div className="form-group">
                        <input 
                            className="form-control"
                            value={path}
                            onChange={e => setPath(e.target.value)}
                            placeholder="Upload path"
                            ></input>
                    </div>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary" onClick={upload}>Upload</button>
                </div>
            </div>
        </div>
    </>
  )
}
