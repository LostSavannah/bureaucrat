import { TreeIndex } from "../../types/TreeResult"
import TreeIndexListView from "./TreeIndexListView"

export interface TreeIndexViewProps{
    currentPath: string[]
    index: TreeIndex[]
    onNavigate: (path:string) => void
}


export default function TreeIndexView({currentPath, index, onNavigate}:TreeIndexViewProps) {
    return (
    <div>
        <h6>
            {index.map((indexItem, indexPosition) =><span key={indexPosition}><a
                    key={indexPosition}
                    href="#"
                    className="text-primary"
                    onClick={() => onNavigate(indexItem.path)}
                >{indexItem.name}</a><span key={`slash${indexPosition}`}>/</span></span>)}
        </h6>
        <div className="d-flex">
            {index.map((index, i) => <TreeIndexListView index={index} selectedPath={currentPath[i+1]} key={i} onNavigate={onNavigate}></TreeIndexListView>)}
        </div>
    </div>
  )
}
