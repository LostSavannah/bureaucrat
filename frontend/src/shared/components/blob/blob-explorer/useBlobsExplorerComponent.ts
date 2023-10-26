import { useEffect, useState } from "react"
import { BureaucratBlobsService } from "../../../services/BureaucratBlobsService";
import { BlobResultIndex } from "../../../types/BlobResult";

export interface BlobDirectory{
    name:string,
    isFolder:boolean
}

export interface UseBlobsExplorerComponentProps{
    onContent: (content:string, name:string) => void
}

export default function useBlobsExplorerComponent(){
    const [directories, setDirectories] = useState<BlobDirectory[]>([]);
    const [currentDirectory, setCurrentDirectory] = useState<string>("");
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [exists, setExists] = useState<boolean>(true);
    const [flag, setFlag] = useState<boolean>(true);

    function search(){
        setFlag(!flag);
    }

    function navigateTo(path:string){
        setCurrentDirectory(path);
        search();
    }

    useEffect(() => {
        new BureaucratBlobsService()
            .index(currentDirectory)
            .then(result => {
                const path:string[] = result.result.index.path;
                const index:BlobResultIndex = result.result.index;
                setExists(index.status == 200);
                setCurrentPath(path);
                const directories:BlobDirectory[] = index.files.map(file => ({
                    name: file, 
                    isFolder: false
                })).concat(index.folders.map(file => ({
                    name: file, 
                    isFolder: true
                })));
                setDirectories(directories);
            });
    }, [flag]);

    return{
        directories,
        currentDirectory,
        currentPath,
        exists,
        search,
        setCurrentDirectory,
        navigateTo
    }
}