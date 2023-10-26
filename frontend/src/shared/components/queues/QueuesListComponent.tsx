import TableComponent from "../table/TableComponent";
import useQueuesListComponent from "./useQueuesListComponent"
import { Link } from 'react-router-dom'

export default function QueuesListComponent(){
    const {queues, deleteQueue} = useQueuesListComponent();
    return <>
        <h2>Queues</h2>
        <TableComponent 
            keySelector={(item) => item}
            items={queues}
            columns={{
                "Queue Name": (item) => <>
                <Link to={item}>{item}</Link>
                </>,
                "Actions": (item) => <>
                    <button onClick={() => deleteQueue(item)} className="btn btn-danger">Delete</button> 
                    <a className="btn btn-warning">Prune</a> 
                </>
            }}
        ></TableComponent>
    </>
}