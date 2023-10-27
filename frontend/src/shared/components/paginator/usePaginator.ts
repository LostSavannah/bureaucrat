import { useState } from "react";

export default function usePaginator(initialPageSize:number, initialPageNumber:number){
    const [currentPage, setCurrentPageState] = useState(initialPageNumber);
    const [pageSize, setPageSize] = useState(initialPageSize);
    
    function next(){
        setCurrentPage(currentPage + 1);
    }

    function previows(){
        setCurrentPage(currentPage - 1);
    }

    function setCurrentPage(value:number){
        setCurrentPageState(value >= 0? value : 0);
    }

    return{
        pageSize,
        currentPage, 
        setPageSize,
        setCurrentPage,
        next,
        previows
    }
}