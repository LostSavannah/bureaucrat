import {useParams} from 'react-router'
import useTablesListComponent from './useTablesListComponent';
import TableComponent from '../table/TableComponent';
import GenericTableComponent from '../table/GenericTableComponent';

export default function TablesListComponent() {
    const {database} = useParams();
    const {
        currentDatabase,
        databases,
        setCurrentDatabase,
        tables,
        result,
        runQuery,
        setQuery,
        query
    } = useTablesListComponent({database:database!});

    function handleChangeDatabase(event:React.ChangeEvent<HTMLSelectElement>){
        setCurrentDatabase(event.target.value);
    }

    function handleChangeQuery(event:React.ChangeEvent<HTMLTextAreaElement>){
        setQuery(event.target.value);
    }

    return (
        <>
            <h2>Database: {currentDatabase}</h2>
            <label htmlFor='databaseSelect'>
                Database:
            </label>
            <div className="form-group form-inline">
                <select onChange={handleChangeDatabase} id="databaseSelect" value={currentDatabase} className="form-control">
                    {databases && databases.map(d => <option value={d} key={d}>{d}</option>)}
                </select>
            </div>
            <h4>Query</h4>
            <div className="form-group">
                <textarea onChange={handleChangeQuery} value={query} className='form-control'></textarea>
            </div>
            <button onClick={runQuery} className='btn btn-primary'>Execute</button>
            <GenericTableComponent items={result}></GenericTableComponent>
            <TableComponent
                columns={{
                    "Table name": (item) => <>{item}</>
                }}
                items={tables}
                keySelector={t => t}
            ></TableComponent>
        </>
    );
}
