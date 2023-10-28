import {useParams} from 'react-router-dom';
import useTableDetailComponent from './useTableDetailComponent';
import GenericTableComponent from '../table/GenericTableComponent';
import Paginator from '../paginator/Paginator';
import Nothing from '../common/Nothing';
 
export default function TableDetailComponent() {
    const {database, table} = useParams();
    const {
        result,
        setPageNumber,
        setPageSize
    } = useTableDetailComponent(database!, table!);
    return (
        <>  
            <h2>Database: {database}</h2>
            <div className="container">
                <div className="row">
                    <h4>Table: {table}</h4>
                </div>
                <div className="row">
                    <Paginator
                        initialPageNumber={0}
                        initialPageSize={10}
                        onPageNumberChanged={setPageNumber}
                        onPageSizeChanged={setPageSize}
                    ></Paginator>
                    <GenericTableComponent items={result}></GenericTableComponent>
                    {result.length == 0 ? <Nothing></Nothing> : ""}
                </div>
            </div>
        </>
    )
}
