import useBlobsExplorerComponent, { BlobDirectory } from "./useBlobsExplorerComponent"
import Nothing from "../../common/Nothing";
import FileUpload from "../../fileUpload/FileUpload";
import TableComponent from "../../table/TableComponent";
import BlobPath from "../blob-path/BlobPath";
export default function BlobsExplorerComponent() {

    const { 
        currentPath,
        directories,
        navigateTo,
        uploadFiles,
        deleteBlob,
        downloadLink
    } = useBlobsExplorerComponent();



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

    return (
      <>
      <h4>Blobs</h4>
      <div className="w-100">
        
        <BlobPath currentPath={currentPath} navigateTo={navigateTo}/>
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
                            <a href={downloadLink(d.name)} className="btn btn-success">⇩</a>
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