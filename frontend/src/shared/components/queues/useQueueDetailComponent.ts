import { useState } from "react";
import { BureaucratQueuesService } from "../../services/BureaucratQueuesService";

export interface QueueOperationMessage{
    epoch: number,
    bytes: number,
    messageClass: string,
    messageText: string
}

export default function useQueueDetailComponent(initial_name:string){
    const [name, setName] = useState(initial_name);
    const [current, setCurrent] = useState<string|null>(null);
    const [requeue, setRequeue] = useState(true);
    const [currentNew, setCurrentNew] = useState<string>("");
    const [messages, setMessages] = useState<QueueOperationMessage[]>([]);

    function addMessage(messageClass: string, messageText: string, bytes:number){
        setMessages([{
            epoch: Date.now()/100,
            messageClass, messageText, bytes
        }, ...messages].slice(0, 100))
    }

    function next(){
        const service = new BureaucratQueuesService();
        service
            .dequeue(name)
            .then(result => {
                setCurrent(result);
                if(result?.length > 0){
                    if(requeue){
                        service.enqueue(name, result);
                        addMessage("success", "[Dequeue-requeue] operation succeed", result.length);
                    }else{
                        addMessage("warning", "[Dequeue-discard] operation succeed", result.length);
                    }
                }else{
                    addMessage("secondary", "[Dequeue-discard] operation succeed (empty response)", result.length);
                }
            })
            .catch(() => {
                addMessage("danger", "[Dequeue] operation failed", 0);
                setCurrent(null);
            });
    }

    function enqueue(){
        new BureaucratQueuesService()
            .enqueue(name, currentNew)
            .then(() => {
                addMessage("success", "[Enqueue] operation succeed", currentNew.length);
            }).catch(() => {
                addMessage("danger", "[Enqueue] operation failed", 0);
            });
    }

    return {
        requeue,
        setName,
        setRequeue,
        enqueue,
        current,
        next,
        name,
        setCurrentNew,
        messages
    }
}