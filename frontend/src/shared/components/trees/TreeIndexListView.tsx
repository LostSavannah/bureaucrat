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
            index.value.map((value, i) =><a
                key={i}
                href="#"
                    className={"d-block " + (selectedPath == undefined? "text-info" : selectedPath == value ? "text-primary": "text-secondary")}
                    onClick={() => onNavigate(`${index.path}/${value}`)}
                >{index.kind === "list" ? parseInt(value)+1 : value}</a>)}
        </ul>
    </div>
}