export default function BlobPath({currentPath, navigateTo}:{
    currentPath:string[],
    navigateTo:(path:string) => void
}) {
    function getPaths(){
        return currentPath.map((name, i) => ({
            path: currentPath.slice(0, i+1).join("/"),
            name
        }));
    }
  return (
    <div className="w-100 d-flex align-items-center">
    <span className="p-1" onClick={() => navigateTo("/")}>📁</span>
        <div>
            {getPaths().map(p => <>/ <span className="badge text-bg-warning" onClick={() => navigateTo(p.path)}>{p.name}</span></>)}
        </div>
    </div>
  )
}
