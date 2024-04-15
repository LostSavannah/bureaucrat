import WorkerKindView from "./WorkerKindView";
import useWorkersKindList from "./useWorkersKindList";

export default function WorkersKindList() {
    const {workers} = useWorkersKindList();
    return (<>
          <div className="w-100">
              <h4>Workers</h4>
              <div className="d-flex w-100 flex-wrap">
                  {workers.map(kind => <WorkerKindView kind={kind}/>)}
              </div>
          </div>
      </>
    )
  }
  