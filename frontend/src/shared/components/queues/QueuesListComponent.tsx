import Nothing from "../common/Nothing";
import TableComponent from "../table/TableComponent";
import useQueuesListComponent from "./useQueuesListComponent"
import { Link } from 'react-router-dom'

export default function QueuesListComponent(){
    const {queues, deleteQueue, createQueue, newQueueName, setNewQueueName} = useQueuesListComponent();
    return <>
        <h2>Queues</h2>
        
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5>Create new queue</h5>
                </div>    
            </div>
            <div className="row">
                <div className="col-2">
                    <label htmlFor="">Queue name: </label>
                </div>
                <div className="col-8">
                    <input
                        value={newQueueName}
                        onChange={(e) => setNewQueueName(e.target.value)} 
                        onKeyDown={(e) => e.key == "Enter" && createQueue()}
                        type="text" 
                        placeholder="Queue name here" 
                        className="form-control" />
                </div>
                <div className="col-2">
                    <button
                        onClick={createQueue} 
                        className="btn btn-primary"
                    >Create</button>
                </div>
            </div>            
        </div>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5>Available queues</h5>
                </div>
                <div className="col-12">
                <TableComponent 
                    keySelector={(item) => item}
                    items={queues}
                    columns={{
                        "Queue Name": (item) => <>
                        <Link to={item}>{item}</Link>
                        </>,
                        "Actions": (item) => <>
                            <button onClick={() => deleteQueue(item)} className="btn btn-danger">Delete</button> 
                        </>
                    }}
                ></TableComponent>
                {queues.length == 0 ? <Nothing></Nothing>: ""}
                </div>
            </div>
        </div>
    </>
}