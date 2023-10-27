import { useEffect, useState } from "react"
import { BureaucratTablesService, QueryResult } from "../../services/BureaucratTablesService";

export interface UseTablesListComponentProps{
    database:string
}

export default function useTablesListComponent({database}:UseTablesListComponentProps){
    const [currentDatabase, setCurrentDatabase] = useState(database);
    const [tables, setTables] = useState<string[]>([]);
    const [databases, setDatabases] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<QueryResult>([]);
    
    function runQuery(){
        setIndex(index+1);
    }

    useEffect(() => {
        new BureaucratTablesService()
            .executeQuery(currentDatabase, query)
            .then(result => {
                setResult(result.result);
            });
    }, [index]);

    useEffect(() => {
        const service:BureaucratTablesService = new BureaucratTablesService();
        service.getTables(currentDatabase)
            .then(result => {
                console.log(result.result);
                setTables(result.result);
                service.getDatabases()
                    .then(result => {
                        console.log(result.result);
                        setDatabases(result.result);
                    });
            });
    }, [currentDatabase]);



    return {
        setCurrentDatabase,
        currentDatabase,
        tables,
        databases,
        result,
        setQuery,
        query,
        runQuery
    };
}