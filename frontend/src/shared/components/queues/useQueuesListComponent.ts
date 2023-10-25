import { useEffect, useState } from "react";
import { BureaucratQueuesService } from "../../services/BureaucratQueuesService";


export default function useQueuesListComponent(){
    const [queues, setQueues] = useState<string[]>([]);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        new BureaucratQueuesService()
            .getQueues()
            .then(queuesResult => setQueues(queuesResult.result));
    }, [index]);
    
    function deleteQueue(name:string){
        new BureaucratQueuesService()
            .deleteQueue(name)
            .then((result) => setIndex(index => index+1))
            .catch(e => console.log(e));
    }

    return {
        queues,
        deleteQueue
    }
}