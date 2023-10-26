import { useEffect, useState } from "react"
import { BureaucratTablesService } from "../../services/BureaucratTablesService";

export interface UseTablesListComponentProps{
    database:string
}

export default function useTablesListComponent({database}:UseTablesListComponentProps){
    const [currentDatabase, setCurrentDatabase] = useState(database);
    const [tables, setTables] = useState<string[]>([]);
    const [databases, setDatabases] = useState<string[]>([]);
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
        databases
    };
}