import { useEffect, useState } from "react";
import { BureaucratQueuesService } from "../../services/BureaucratQueuesService";


export default function useQueuesListComponent(){
    const [queues, setQueues] = useState<string[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [newQueueName, setNewQueueName] = useState("");

    useEffect(() => {
        new BureaucratQueuesService()
            .getQueues()
            .then(queuesResult => setQueues(queuesResult.result));
    }, [index]);
    
    function deleteQueue(name:string){
        new BureaucratQueuesService()
            .deleteQueue(name)
            .then((_) => setIndex(index => index+1))
            .catch(e => console.log(e));
    }

    async function createQueueAsync(){
        if(!newQueueName)return;
        const service = new BureaucratQueuesService();
        if((await service.getQueues()).result.includes(newQueueName))return;
        await service.enqueue(newQueueName, "<CREATION>");
        await service.dequeue(newQueueName);
        setIndex(index + 1);
        setNewQueueName("");
    }

    function createQueue(){
        createQueueAsync();
    }

    return {
        queues,
        deleteQueue,
        createQueue,
        newQueueName,
        setNewQueueName
    }
}