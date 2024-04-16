import {useParams} from 'react-router-dom';
import useQueueDetailComponent from "./useQueueDetailComponent";
import Combo from '../common/Combo';
import Nothing from '../common/Nothing';

export default function QueueDetailComponent(){
    const {queueName} = useParams();
    const {
        name,
        requeue,
        setRequeue,
        next, 
        current,
        setCurrentNew,
        enqueue,
        messages
    } = useQueueDetailComponent(queueName!);
    
    function onDequeue(){
        next();
    }

    function onCurrentNewChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        setCurrentNew(event.target.value);
    }

    return <>
        <h4>Queue: {name}</h4>
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    Enqueue
                </h5>
                <div className="form-group">
                    <textarea
                        placeholder="Paste or type here the data to be enqueued"  
                        onChange={onCurrentNewChange} className='form-control'></textarea>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                <button onClick={enqueue} className='btn btn-primary'>Enqueue ▲</button>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    Dequeue
                </h5>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="w-50 d-flex">
                    <Combo
                        items={[true, false]}
                        fromString={e => (e === "requeue")}
                        toStringV={e => e ? "requeue" : "discard"}
                        value={requeue}
                        getDescription={e => e ? "Requeue values": "Discard values"}
                        onChange={setRequeue}
                    ></Combo>
                    </div>

                    <button onClick={onDequeue} className={"btn btn-" + (requeue? "warning": "danger")}>Dequeue ▼</button>
                </div>
                <div className="form-group">
                    {current ? <>
                    <textarea readOnly className='form-control' value={current}></textarea>
                    </>
                    : <Nothing></Nothing>}
                </div>
            </div>
        </div>
        {(messages?.length ?? 0) > 0 && <div 
            className={"alert alert-" + messages[0].messageClass}>
            Epoch: {messages[0].epoch}, {messages[0].bytes} bytes. {messages[0].messageText}
            </div>
        }
    </>
}