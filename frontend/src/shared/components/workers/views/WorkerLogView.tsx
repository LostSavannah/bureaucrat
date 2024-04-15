import { WorkerLog } from "../../../types/Workers";
import Table from "../../table/Table";

export default function WorkerLogView({logs}:{logs:WorkerLog[]}) {

    const factors: {value:number, title:string}[] = [
        {value: 60, title: "Minute"},
        {value: 24, title: "Hour"},
        {value: 7, title: "Week"}
    ];
  function getTimeExpression(moment: number){
    let delta = (Date.now()/1000) - moment;
    if(delta < 60) return "Just now";
    delta /= 60;
    let factorTitle = "";
    for(const factor of factors){
        factorTitle = factor.title;
        if(delta < factor.value){
            break;
        }
        delta /= factor.value;
    }

    const capped = Math.floor(delta)
    return capped > 1 ? `${capped} ${factorTitle}s ago...` : `A ${factorTitle} ago`;
  }
  
  function getTimeIcon(moment: number){
    const delta = (Date.now()/1000) - moment;
        return (
            delta < 60 ? "⚡":
            delta < 3600 ? "🕑":
            delta < 3600 * 24 ? "🌞":
            delta < 3600 * 24 * 31? "📅":
            "👴"
        );
    }


    function getKindBadgeClass(kind:string){
        return (
            kind === "Information" ? "info":
            kind === "Alert" ? "warning":
            kind === "Error" ? "dark":
            kind === "Warning" ? "danger":
            kind === "Success" ? "success":
            "secondary"
        );
    }


  const items = [...logs];
  items.reverse();
  return <div className="w-100 h-100 overflow-y-scroll p-2">
    <h5>Logs</h5>
    <Table 
        getId={l => l.id}
        items={items}
        columns={[
            {
                name: "Epoch",
                displayName: "",
                renderer: l => <span>
                    {getTimeIcon(l.epoch)} ({getTimeExpression(l.epoch)})
                </span>
            },
            {
                name: "Kind",
                displayName: "",
                renderer: l => <> <span className={`badge text-bg-${getKindBadgeClass(l.kind)}`}>
                      {l.kind}
                </span>
                </>
            },
            {
                name: "Title",
                displayName: "",
                renderer: l => <span>{l.title}</span>
            },
            {
                name: "Message",
                displayName: "",
                renderer: l => <span>{l.detail}</span>
            }
        ]}
    ></Table>
  </div>
}
