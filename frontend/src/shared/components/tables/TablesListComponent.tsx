import {useParams} from 'react-router'
import useTablesListComponent from './useTablesListComponent';
import TableComponent from '../table/TableComponent';

export default function TablesListComponent() {
    const {database} = useParams();
    const {
        currentDatabase,
        databases,
        setCurrentDatabase,
        tables
    } = useTablesListComponent({database:database!});

    function handleChangeDatabase(event:React.ChangeEvent<HTMLSelectElement>){
        setCurrentDatabase(event.target.value);
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
