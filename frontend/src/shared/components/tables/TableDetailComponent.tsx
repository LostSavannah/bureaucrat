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
            <h4>Database: {database}</h4>
            <div className="container">
                <div className="row">
                    <h5>Table: {table}</h5>
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
