
export interface TableComponentProps<T>{
    keySelector: (item:T) => string
    items:T[]
    columns: {[key:string] : (item:T) => React.ReactNode}
}

export default function TableComponent<T>({keySelector, items, columns}:TableComponentProps<T>){
    return <table className="table">
    <thead>
    <tr>
        {Object.keys(columns).map(c => <th key={c} scope="col">{c}</th>)}
    </tr>
    </thead>
    <tbody>
        {items.map(item => <tr key={keySelector(item)}>
            {Object.keys(columns).map(column => <td>{columns[column](item)}</td>)}
        </tr>)}
    </tbody>
    </table>;
}