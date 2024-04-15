
export interface TableColumn<T>{
    name : string,
    displayName? :string,
    renderer: (item:T) => JSX.Element
}

export interface TableProps<T>{
    getId: (item:T) => string,
    items: T[],
    columns: TableColumn<T>[]
}

export default function Table<T>({getId, items, columns}:TableProps<T>) {
  return (<>
    <table className="table">
        <thead>
            <tr>
            {columns.map(c => <th  key={`${c.name}`}>{c.displayName ?? c.name}</th>)}
            </tr>
        </thead>
        <tbody>
            {items.map(item => <tr key={`${getId(item)}`}>
                {columns.map(c => <td  key={`${getId(item)}_${c.name}`}>{c.renderer(item)}</td>)}
            </tr>)}
        </tbody>
    </table>
  </>
  )
}
