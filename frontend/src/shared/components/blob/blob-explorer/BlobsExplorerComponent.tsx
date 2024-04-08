import React from "react";
import useBlobsExplorerComponent, { BlobDirectory } from "./useBlobsExplorerComponent"
import Nothing from "../../common/Nothing";
import FileUpload from "../../fileUpload/FileUpload";
import TableComponent from "../../table/TableComponent";
export default function BlobsExplorerComponent() {

    const {
        search, 
        setCurrentDirectory, 
        currentDirectory,
        currentPath,
        directories,
        navigateTo,
        uploadFiles,
        deleteBlob
    } = useBlobsExplorerComponent();

    function handleOnKeyDown(event:React.KeyboardEvent<HTMLInputElement>){
        if(event.key === "Enter"){
            search();
        }
    }

    function handleOnChange(event:React.ChangeEvent<HTMLInputElement>){
        setCurrentDirectory(event.target.value);
    }

    function getKey(b:BlobDirectory):string{
        return (b.isFolder? "fol.": "doc.") + b.name;
    }

    function navigate(d:BlobDirectory){
        if(d.isFolder){
            const path = [...currentPath, d.name].join("/");
            navigateTo(path);
        }
    }

    function handleDeleteBlob(d:BlobDirectory){
        if(!d.isFolder){
            const path = [...currentPath, d.name].join("/");   
            deleteBlob(path);
        }
    }

    function downloadLink(d:BlobDirectory){
        const apiUrl:string = import.meta.env.VITE_API_URL;
        const baseName:string = import.meta.env.VITE_BASENAME;
        const baseUrl:string = `${apiUrl}${baseName}/download:`;
        return baseUrl + [...currentPath, d.name].join("/");
    }

    return (
      <>
      <h4>Blobs</h4>
      <div className="w-100">
        <div className="w-100 d-flex align-items-center">
            <span className="p-1">📁</span>
            <input type="text" 
                onKeyDown={handleOnKeyDown} 
                onChange={handleOnChange}
                value={currentDirectory}
                className="form-control" />
        </div>
        <div className="w-100">
        <TableComponent
                    items={directories}
                    columns={{
                        "Directories": d => 
                            d.isFolder? 
                            <a href="#" onClick={() => navigate(d)}>🗀{d.name}</a> : 
                            <>🗎{d.name}</>,
                        "Actions": d =>
                            !d.isFolder? 
                            <>
                            <a href={downloadLink(d)} className="btn btn-success">⇩</a>
                            <button onClick={() => handleDeleteBlob(d)} className="btn btn-danger">X</button>
                            </>
                            :""
                    }}
                    keySelector={getKey}
                ></TableComponent>
                {directories.length == 0? <Nothing></Nothing>: ""}
        </div>
        
      </div>
      <FileUpload onUpload={uploadFiles}></FileUpload>
      </>
    )
}