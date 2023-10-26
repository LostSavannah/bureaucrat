import {useParams} from 'react-router-dom';
import useQueueDetailComponent from "./useQueueDetailComponent";
import Combo from '../common/Combo';

export default function QueueDetailComponent(){
    const {queueName} = useParams();
    const {
        name,
        requeue,
        setRequeue,
        next, 
        current,
        setCurrentNew,
        enqueue
    } = useQueueDetailComponent(queueName!);
    
    function onDequeue(){
        next();
    }

    function onCurrentNewChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        setCurrentNew(event.target.value);
    }

    return <>
        <h2>{name}</h2>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    Dequeue
                </h5>
                <div className="form-group">
                    <label htmlFor="">Dequeue mode:</label>
                    <Combo
                        items={[true, false]}
                        fromString={e => (e === "requeue")}
                        toStringV={e => e ? "requeue" : "discard"}
                        value={requeue}
                        getDescription={e => e ? "Requeue": "Discard"}
                        onChange={setRequeue}
                    ></Combo>
                </div>
                <button onClick={onDequeue} className='btn btn-primary'>Dequeue</button>
                <div className="form-group">
                    {current ? <textarea className='form-control' value={current}></textarea>: ""}
                </div>
            </div>
         </div>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    Enqueue
                </h5>
                <div className="form-group">
                    <textarea onChange={onCurrentNewChange} className='form-control'></textarea>
                </div>
                <button onClick={enqueue} className='btn btn-primary'>Enqueue</button>
            </div>
        </div>
    </>
}