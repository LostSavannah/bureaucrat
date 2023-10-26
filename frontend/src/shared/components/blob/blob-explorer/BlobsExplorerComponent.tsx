import React from "react";
import useBlobsExplorerComponent, { BlobDirectory } from "./useBlobsExplorerComponent"

export default function BlobsExplorerComponent() {
    function download(content:string, name:string){
        console.log(content);
        console.log(name);
    }

    const {
        search, 
        setCurrentDirectory, 
        currentDirectory,
        currentPath,
        directories, navigateTo
    } = useBlobsExplorerComponent({onContent: download});

    function handleOnKeyDown(event:React.KeyboardEvent<HTMLInputElement>){
        if(event.key === "Enter"){
            search();
        }
    }

    function handleOnChange(event:React.ChangeEvent<HTMLInputElement>){
        setCurrentDirectory(event.target.value);
    }

    function getIcon(b:BlobDirectory):string{
        return b.isFolder? "🗀": "🗎";
    }

    function getKey(b:BlobDirectory):string{
        return (b.isFolder? "fol.": "doc.") + b.name;
    }

    function navigate(name:string){
        const path = [...currentPath, name].join("/");
        navigateTo(path);
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
                        {directories.map(d => <li key={getKey(d)}>
                            <a href="#" onClick={() => navigate(d.name)}>{getIcon(d)+d.name}</a>
                        </li>)}
                    </ul>
                </div>
            </div>
        </div>
      </div>
      </>
    )
}