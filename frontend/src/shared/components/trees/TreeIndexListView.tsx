import { TreeIndex } from "../../types/TreeResult"

export interface TreeIndexListViewProps{
    index: TreeIndex
    onNavigate: (path:string) => void
    selectedPath: string|undefined
}

export default function TreeIndexListView({index, onNavigate, selectedPath}:TreeIndexListViewProps, key:number){
    return <div className="h-100" key={key}>
        <ul key={key}>
            {typeof index.value === "string" ? 
            <>{index.value}</> : 
            index.value.map((value, i) =><button
                key={i}
                    className={"d-block btn badge text-bg-" + (selectedPath == undefined? "info" : selectedPath == value ? "primary": "secondary")}
                    onClick={() => onNavigate(`${index.path}/${value}`)}
                >{index.kind === "list" ? `[${value}]` : value}</button>)}
        </ul>
    </div>
}