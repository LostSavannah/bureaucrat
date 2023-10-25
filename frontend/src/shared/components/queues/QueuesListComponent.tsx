import TableComponent from "../table/TableComponent";
import useQueuesListComponent from "./useQueuesListComponent"

export default function QueuesListComponent(){
    const {queues, deleteQueue} = useQueuesListComponent();
    return <>
        <h2>Available queues</h2>
        <TableComponent 
            keySelector={(item) => item}
            items={queues}
            columns={{
                "Queue Name": (item) => <>{item}</>,
                "Actions": (item) => <>
                    <button onClick={() => deleteQueue(item)} className="btn btn-danger">Delete</button> 
                    <a className="btn btn-warning">Prune</a> 
                </>
            }}
        ></TableComponent>
    </>
}