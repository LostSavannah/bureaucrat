import { TreeIndex } from "../../types/TreeResult"

export interface TreeIndexListViewProps{
    index: TreeIndex
    onNavigate: (path:string) => void
}

export default function TreeIndexListView({index, onNavigate}:TreeIndexListViewProps, key:number){
    return <div className="h-100" key={key}>
        <ul key={key}>
            {typeof index.value === "string" ? 
            <>{index.value}</> : 
            index.value.map((value, i) =><a
                key={i}
                href="#"
                    className="d-block text-success"
                    onClick={() => onNavigate(`${index.path}/${value}`)}
                >{value}</a>)}
        </ul>
    </div>
}