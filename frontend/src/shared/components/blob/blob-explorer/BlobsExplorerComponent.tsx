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
        const baseUrl:string = "http://127.0.0.1:19760/blobs/download:";
        return baseUrl + [...currentPath, d.name].join("/");
    }

    return (
      <>
      <h2>Blobs</h2>
      <FileUpload onUpload={uploadFiles}></FileUpload>
      <div className="container">
        <div className="row">
            <h5>Explore</h5>
        </div>
        <div className="row">
            <div className="col-12">
                <div className="form-group">
                  <input type="text" 
                      onKeyDown={handleOnKeyDown} 
                      onChange={handleOnChange}
                      value={currentDirectory}
                      className="form-control" />
                </div>                
            </div>
        </div>
        <div className="row">
            <div className="col-12">
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
                            <a href={downloadLink(d)} className="btn btn-success">Download</a>
                            <button onClick={() => handleDeleteBlob(d)} className="btn btn-danger">Delete</button>
                            </>
                            :""
                    }}
                    keySelector={getKey}
                ></TableComponent>
                {directories.length == 0? <Nothing></Nothing>: ""}
            </div>
        </div>
      </div>
      </>
    )
}