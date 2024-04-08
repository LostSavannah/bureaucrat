import Nothing from "../common/Nothing";
import TableComponent from "../table/TableComponent";
import useQueuesListComponent from "./useQueuesListComponent"
import { Link } from 'react-router-dom'

export default function QueuesListComponent(){
    const {queues, deleteQueue, createQueue, newQueueName, setNewQueueName} = useQueuesListComponent();
    return <>
        <h4>Queues</h4>
        <div className="w-100">
            <TableComponent 
                    keySelector={(item) => item}
                    items={queues}
                    columns={{
                        "Queue Name": (item) => <>
                        <Link to={item}>{item}</Link>
                        </>,
                        "Actions": (item) => <>
                            <button onClick={() => deleteQueue(item)} className="btn btn-danger">X</button> 
                        </>
                    }}
                ></TableComponent>
            {queues.length == 0 ? <Nothing></Nothing>: ""}
        </div>
        <div className="w-100 d-flex">
            <input 
                value={newQueueName}
                className="flex-grow-1 form-control"                        
                onChange={(e) => setNewQueueName(e.target.value)} 
                onKeyDown={(e) => e.key == "Enter" && createQueue()}
                type="text" 
                placeholder="New queue name here..." 
                ></input>
            <button
                onClick={createQueue} 
                className="btn btn-primary">+</button>
        </div>
    </>
}