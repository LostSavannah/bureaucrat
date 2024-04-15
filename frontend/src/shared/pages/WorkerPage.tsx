import { useParams } from "react-router-dom";
import WorkerView from "../components/workers/WorkerView";

export default function WorkerPage(){
    const kind = useParams()["kind"]!;
    const id = useParams()["id"]!;
    return <WorkerView kind={kind} id={id}/>;
}