import {useParams} from 'react-router-dom';
import useTableDetailComponent from './useTableDetailComponent';
import GenericTableComponent from '../table/GenericTableComponent';
import Paginator from '../paginator/Paginator';
 
export default function TableDetailComponent() {
    const {database, table} = useParams();
    const {
        result,
        setPageNumber,
        setPageSize
    } = useTableDetailComponent(database!, table!);
    return (
        <>
            <GenericTableComponent items={result}></GenericTableComponent>
            <Paginator
                initialPageNumber={0}
                initialPageSize={10}
                onPageNumberChanged={setPageNumber}
                onPageSizeChanged={setPageSize}
            ></Paginator>
        </>
    )
}
