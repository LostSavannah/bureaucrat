export default function WorkerStatusView({status}:{status:number}) {

    const statusDescription :{description:string, className: string} = {
      0:{
          description: "Loading...",
          className: "badge text-bg-light"
      },
      1: {
          description: "Stopped 💀",
          className: "badge text-bg-dark"
      },
      2:{
          description: "Stopping...",
          className: "badge text-bg-danger"
      },
      3:{
          description: "Paused ✋",
          className: "badge text-bg-warning"
      },
      4:{
          description: "Active ⚡",
          className: "badge text-bg-success"
      }
    }[status]!;
    return (
      <div className="w-100 p-2">
          <span className={statusDescription.className}>{statusDescription.description}</span>
      </div>
    )
  }
  