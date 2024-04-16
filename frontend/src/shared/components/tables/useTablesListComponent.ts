import { useEffect, useState } from "react"
import { BureaucratTablesService } from "../../services/BureaucratTablesService";
import { Dict } from "../../types/Common";

export interface UseTablesListComponentProps{
    database:string
}

export default function useTablesListComponent({database}:UseTablesListComponentProps){
    const [currentDatabase, setCurrentDatabase] = useState(database);
    const [tables, setTables] = useState<string[]>([]);
    const [databases, setDatabases] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<Dict[]>([]);
    const [history, setHistory] = useState<string[]>([]);

    function saveHistory(){
        const localHistory = [query, ...history.filter(i => i != query)];
        while(localHistory.length > 10){
            history.pop();
        }
        setHistory(localHistory);
    }

    function runQuery(){
        saveHistory();
        setIndex(index+1);
    }

    async function loadDatabasesAndTables(){
        const service:BureaucratTablesService = new BureaucratTablesService();
        setTables((await service.getTables(currentDatabase)).result);
        setDatabases((await service.getDatabases()).result);
    }

    useEffect(() => {
        new BureaucratTablesService()
            .executeQuery(currentDatabase, query)
            .then(result => {
                if(result.result != null){
                    setResult(result.result);
                    loadDatabasesAndTables();   
                }else{
                    alert("SQL Error!");
                }
            });
    }, [index]);

    useEffect(() => {
        loadDatabasesAndTables();
    }, [currentDatabase]);

    return {
        setCurrentDatabase,
        currentDatabase,
        tables,
        databases,
        result,
        setQuery,
        query,
        runQuery,
        history
    };
}