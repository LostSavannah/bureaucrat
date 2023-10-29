import { TreeIndex } from "../../types/TreeResult"
import TreeIndexListView from "./TreeIndexListView"

export interface TreeIndexViewProps{
    index: TreeIndex[]
    onNavigate: (path:string) => void
}


export default function TreeIndexView({index, onNavigate}:TreeIndexViewProps) {
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
            {index.map((index, i) => <TreeIndexListView index={index} key={i} onNavigate={onNavigate}></TreeIndexListView>)}
        </div>
    </div>
  )
}
