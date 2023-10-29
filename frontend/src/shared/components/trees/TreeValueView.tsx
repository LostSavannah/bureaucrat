import { TreeValue } from "../../types/TreeResult"

export interface TreeValueViewProps{
    value: TreeValue
}

export default function TreeValueView({value}:TreeValueViewProps) {
    function render(value:TreeValue):JSX.Element{
        if(typeof value === "string"){
            return <>"{value}"</>;
        }else if(Array.isArray(value)){
            return <ol>{(value as TreeValue[]).map(v => <li> {render(v)} </li>)}</ol>;
        }else{
            return <ul>{Object.keys(value).map((v) => <li> <strong>{v}</strong>: {render(value[v] as TreeValue)} </li>)}</ul>
        } 
    }

    return render(value);
}
