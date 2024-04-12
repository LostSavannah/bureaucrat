export interface PathViewerProps{
    path:string[],
    onNavigate:(path:string[]) => void
}

export default function PathViewer({path, onNavigate}:PathViewerProps) {
    return (
        <>
        {path.map((p, index) => <button 
            className="btn" 
            key={index}
            onClick={() => onNavigate(path.slice(0, index+1))}>
            {p}
        </button>+"/")}
        {path}
        </>
    )
}
