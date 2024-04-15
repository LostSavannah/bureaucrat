import { useParams } from "react-router";
import WorkersOfKindList from "../components/workers/WorkersOfKindList";

export default function WorkerKindPage() {
  const kind = useParams()["kind"]!;
  return (
    <WorkersOfKindList kind={kind}/>
  )
}
