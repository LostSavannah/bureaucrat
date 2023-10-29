import { useState } from "react"

export interface PathViewerProps{
    path:string[],
    onNavigate:(path:string[]) => void
}

export default function PathViewer({path, onNavigate}:PathViewerProps) {
    const [currentPath, _] = useState(path);
    return (
        <>
        {currentPath.map((p, index) => <button 
            className="btn" 
            key={index}
            onClick={() => onNavigate(currentPath.slice(0, index+1))}>
            {p}
        </button>+"/")}
        {currentPath}
        </>
    )
}
