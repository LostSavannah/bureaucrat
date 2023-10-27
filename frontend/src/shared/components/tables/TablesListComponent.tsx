import {useParams} from 'react-router'
import useTablesListComponent from './useTablesListComponent';
import TableComponent from '../table/TableComponent';
import GenericTableComponent from '../table/GenericTableComponent';
import { Link } from 'react-router-dom';

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
        query,
        history
    } = useTablesListComponent({database:database!});

    function handleChangeDatabase(event:React.ChangeEvent<HTMLSelectElement>){
        setCurrentDatabase(event.target.value);
    }

    function handleChangeQuery(event:React.ChangeEvent<HTMLTextAreaElement>){
        setQuery(event.target.value);
    }

    function handleKeyDown(event:React.KeyboardEvent<HTMLTextAreaElement>){
        if(event.ctrlKey && event.code === "Enter"){
            runQuery();
        }
    }

    function executeQuery(query:string){
        setQuery(query);
        runQuery();
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
                <textarea onKeyDown={handleKeyDown} onChange={handleChangeQuery} value={query} className='form-control'></textarea>
            </div>
            <button onClick={runQuery} className='btn btn-danger'>Execute (ctrl+Enter)</button>
            <TableComponent
                columns={{
                    "History": (item) => <a href='#' onClick={() => executeQuery(item)}>{item}</a>
                }}
                items={history}
                keySelector={t => history.indexOf(t).toString()}
            ></TableComponent>
            <GenericTableComponent items={result}></GenericTableComponent>
            <TableComponent
                columns={{
                    "Tables": (item) => <><Link to={item}>{item}</Link></>
                }}
                items={tables}
                keySelector={t => t}
            ></TableComponent>
        </>
    );
}
