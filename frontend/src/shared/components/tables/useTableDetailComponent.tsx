import { useEffect, useState } from "react";
import { BureaucratTablesService } from "../../services/BureaucratTablesService";
import { Dict } from "../../types/Common";


export default function useTableDetailComponent(initialDatabase:string, initialTable:string){
    const [database, setDatabase] = useState<string>(initialDatabase);
    const [table, setTable] = useState<string>(initialTable);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [result, setResult] = useState<Dict[]>([]);

    useEffect(() => {
        new BureaucratTablesService()
            .getRows(database, table, pageNumber, pageSize)
            .then(result => {
                setResult(result.result);
            });
    }, [database, table, pageNumber, pageSize]);

    return {
        setDatabase, setTable, setPageNumber, setPageSize, result
    }
}