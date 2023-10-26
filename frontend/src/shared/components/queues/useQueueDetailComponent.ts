import { useState } from "react";
import { BureaucratQueuesService } from "../../services/BureaucratQueuesService";
export default function useQueueDetailComponent(initial_name:string){
    const [name, setName] = useState(initial_name);
    const [current, setCurrent] = useState<string|null>(null);
    const [requeue, setRequeue] = useState(true);
    const [currentNew, setCurrentNew] = useState<string>("");

    function next(){
        const service = new BureaucratQueuesService();
        service
            .dequeue(name)
            .then(result => {
                setCurrent(result.result);
                if(requeue && result.result){
                    service.enqueue(name, result.result);
                }
            })
            .catch(() => {
                setCurrent(null);
            });
    }

    function enqueue(){
        new BureaucratQueuesService()
            .enqueue(name, currentNew);
    }

    return {
        requeue,
        setName,
        setRequeue,
        enqueue,
        current,
        next,
        name,
        setCurrentNew
    }
}