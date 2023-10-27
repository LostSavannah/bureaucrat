import { useEffect } from "react";
import usePaginator from "./usePaginator"

export interface PaginatorProps{
    initialPageSize:number,
    initialPageNumber:number,
    onPageNumberChanged: (pageNumber:number) => void,
    onPageSizeChanged: (pageNumber:number) => void
};

export default function Paginator({onPageNumberChanged, onPageSizeChanged}:PaginatorProps) {
    const {
        currentPage,
        setCurrentPage,
        next,
        previows,
        pageSize
    } = usePaginator(10, 0);

    useEffect(() => onPageNumberChanged(currentPage), [currentPage]);
    useEffect(() => onPageSizeChanged(pageSize), [pageSize]);

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        const value = parseInt(event.target.value);
        if(value != undefined){
            setCurrentPage(value);
        }
    }

    return (
        <>
        <div className="container">
            <div className="row align-items-center p-2">
                <div className="col-auto">
                <button className="btn btn-primary" disabled={currentPage == 0} onClick={previows}>Previows</button>
                </div>
                <div className="col-auto">
                <input className="input" type="number" value={currentPage} onChange={handleChange}></input>
                </div>
                <div className="col-auto">
                <button className="btn btn-primary" onClick={next}>Next</button>
                </div>
            </div>
        </div>
        </>
    )
}
