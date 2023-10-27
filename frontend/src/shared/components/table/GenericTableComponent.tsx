import TableComponent from "./TableComponent";

type dict = {[key:string]:any}

export interface GenericTableComponentProps{
    items:dict[]   
}

export default function GenericTableComponent({items}:GenericTableComponentProps){
    if(items.length > 0){
        const columnNames:string[] = Object.keys(items[0]);
        if(columnNames.length > 0){
            const columns = columnNames.map(c => ({[c]: ((item:dict) => <>{item[c]}</>)}))
            return <TableComponent
                items={items}
                columns={Object.assign({}, ...columns)}
                keySelector={item => items.indexOf(item).toString()}
            ></TableComponent>;
        }
    }
    return <></>
}