import React from "react";
import useBlobsExplorerComponent, { BlobDirectory } from "./useBlobsExplorerComponent"
import Nothing from "../../common/Nothing";

export default function BlobsExplorerComponent() {

    const {
        search, 
        setCurrentDirectory, 
        currentDirectory,
        currentPath,
        directories,
        navigateTo
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
            console.log(path); 
            navigateTo(path);
        }
    }

    function downloadLink(d:BlobDirectory){
        const baseUrl:string = "http://127.0.0.1:19760/blobs/download:";
        return baseUrl + [...currentPath, d.name].join("/");
    }

    return (
      <>
      <h2>Blobs</h2>
      <div className="form-group">
        <input type="text" 
            onKeyDown={handleOnKeyDown} 
            onChange={handleOnChange}
            value={currentDirectory}
            className="form-control" />
      </div>
      <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="form-group">
                    <ul>
                        {directories.map(d => <li key={getKey(d)} >
                            {
                                d.isFolder? 
                                <a href="#" onClick={() => navigate(d)}>🗀{d.name}</a> : 
                                <a href={downloadLink(d)}>🗎{d.name}</a>
                            }
                            
                        </li>)}
                    </ul>
                </div>
                {directories.length == 0? <Nothing></Nothing>: ""}
            </div>
        </div>
      </div>
      </>
    )
}